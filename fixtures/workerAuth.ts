import { test as base } from "@playwright/test";
import { APIFunctions } from "../helpers/apiFunctions";
import { Booking } from "../types/bookingType";

// Define the type for our custom worker-scoped fixture
export interface WorkerFixture {
  workerAuth: {
    username: string;
    password: string;
    token: string;
    bookingId: string;
  };
}

export const test = base.extend<{}, WorkerFixture>({
  // workerAuth is a worker-scoped fixture
  workerAuth: [
    async ({}, use, workerInfo) => {
      // restful-booker API uses fixed credentials: admin/password123
      const username = "admin";
      const password = "password123";
      const bookingData: Booking = {
        firstname: "Test",
        lastname: "User",
        totalprice: 369,
        depositpaid: true,
        bookingdates: {
          checkin: "2025-11-25",
          checkout: "2025-11-29",
        },
        additionalneeds: "breakfast",
      };

      // Perform API authentication call and save storage state
      const token = await APIFunctions.getAuthToken(username, password);
      const bookingResponse = await APIFunctions.postBooking(bookingData, token);
      const workerAuth = {
        username,
        password,
        token,
        bookingId: String(bookingResponse.bookingid),
      };

      // Provide the authorization data to necessary tests for this worker
      await use(workerAuth);

      await APIFunctions.deleteBooking(workerAuth.bookingId, workerAuth.token);
    },
    { scope: "worker" }, // This makes it a worker-scoped fixture
  ],
});

export { expect } from "@playwright/test";
