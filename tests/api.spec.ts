import { test, expect } from "../fixtures/workerAuth";
import { APIFunctions } from "../helpers/apiFunctions";
import { SchemaAssertions } from "../helpers/schemaValidation";
import { Booking } from "../types/bookingType";

test.describe("API Testing Restful Booking Endpoints", () => {
  test("should Return Server Status", async ({}) => {
    await APIFunctions.getPing();
  });

  test("should Return List of All Booking IDs", async ({}) => {
    const listOfIds = await APIFunctions.getAllBookingIds();
    expect(listOfIds).toBeDefined();
    expect(listOfIds.length).toBeGreaterThan(0);
  });

  test("should Return List of Filtered Booking IDs", async ({ workerAuth }) => {
    const listOfIds = await APIFunctions.getFilteredBookingIds(
      "firstname=Test&lastname=User"
    );
    expect(listOfIds).toBeDefined();
    expect(listOfIds.length).toBeGreaterThan(0);
    // Verify our worker's booking is in the filtered results
    const bookingIds = listOfIds.map((b: any) => b.bookingid);
    expect(bookingIds).toContain(Number(workerAuth.bookingId));
  });

  test("should Return Booking by ID", async ({ workerAuth }) => {
    const myBooking: Booking = await APIFunctions.getBookingById(workerAuth.bookingId);
    SchemaAssertions.expectValidBookingSchema(myBooking);
  });

  test("should Create and Delete new Booking", async ({ workerAuth }) => {
    const response = await APIFunctions.postBooking(
      {
        firstname: "New",
        lastname: "Booking",
        totalprice: 123,
        depositpaid: false,
        bookingdates: {
          checkin: "2025-11-25",
          checkout: "2025-11-29",
        },
        additionalneeds: "dinner",
      },
      workerAuth.token
    );

    const newBooking = response.booking;
    SchemaAssertions.expectValidBookingSchema(newBooking);
    expect(newBooking.firstname).toBe("New");
    expect(newBooking.lastname).toBe("Booking");
    expect(newBooking.totalprice).toBe(123);
    expect(newBooking.depositpaid).toBe(false);
    expect(newBooking.bookingdates.checkin).toBe("2025-11-25");
    expect(newBooking.bookingdates.checkout).toBe("2025-11-29");
    expect(newBooking.additionalneeds).toBe("dinner");
    expect(response.bookingid).not.toEqual(Number(workerAuth.bookingId));

    await APIFunctions.deleteBooking(String(response.bookingid), workerAuth.token);
  });

  test("should Update an existing Booking", async ({ workerAuth }) => {
    const updatedBooking = await APIFunctions.putBooking(
      workerAuth.bookingId,
      {
        firstname: "Updated",
        lastname: "Booking",
        totalprice: 456,
        depositpaid: false,
        bookingdates: {
          checkin: "2025-11-28",
          checkout: "2025-11-30",
        },
        additionalneeds: "air conditioned room",
      },
      workerAuth.token
    );
    SchemaAssertions.expectValidBookingSchema(updatedBooking);
    expect(updatedBooking.firstname).toBe("Updated");
    expect(updatedBooking.lastname).toBe("Booking");
    expect(updatedBooking.totalprice).toBe(456);
    expect(updatedBooking.depositpaid).toBe(false);
    expect(updatedBooking.bookingdates.checkin).toBe("2025-11-28");
    expect(updatedBooking.bookingdates.checkout).toBe("2025-11-30");
    expect(updatedBooking.additionalneeds).toBe("air conditioned room");
  });

  test("should Update single Booking value", async ({ workerAuth }) => {
    const patchData = { depositpaid: true };
    const updatedBooking = await APIFunctions.patchBooking(
      workerAuth.bookingId,
      patchData,
      workerAuth.token
    );
    SchemaAssertions.expectValidBookingSchema(updatedBooking);
    expect(updatedBooking.depositpaid).toBe(true);
  });
});
