import { expect } from "@playwright/test";
import { Booking } from "../types/bookingType";

class SchemaValidation {
  public async expectValidBookingSchema(booking: Booking) {
    expect(booking).toMatchObject({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      },
      additionalneeds: expect.any(String),
    });
  }
}

export const SchemaAssertions = new SchemaValidation();
