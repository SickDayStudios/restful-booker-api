import { BaseApiClient } from "./baseApiClient";
import { Booking } from "../types/bookingType";

const endpoints = {
  auth: "/auth",
  booking: (bookingFilter?: string) => bookingFilter ? `/booking?${bookingFilter}` : `/booking`,
  booking_by_id: (bookingId: string) => `/booking/${bookingId}`,
  ping: "/ping",
};

class ApiFunctions extends BaseApiClient {
  constructor() {
    super();
  }

  async getAuthToken(username: string, password: string) {
    const { token } = await this.post(endpoints.auth, { username, password });
    return token;
  }

  async getPing() {
    await this.get(endpoints.ping);
  }

  async getFilteredBookingIds(bookingFilter: string) {
    const response = await this.get(endpoints.booking(bookingFilter));
    return response;
  }

  async getAllBookingIds() {
    const response = await this.get(endpoints.booking());
    return response;
  }

  async getBookingById(bookingId: string) {
    const response = await this.get(endpoints.booking_by_id(bookingId));
    return response;
  }

  async postBooking(booking: Booking, token: string) {
    try {
      const response = await this.post(
        endpoints.booking(),
        booking,
        token
      );
      return response;
    } catch (error) {
      console.error(`Failed to create booking: ${error}`);
      throw error;
    }
  }

  async putBooking(bookingId: string, booking: Booking, token: string) {
    try {
      const updatedBooking = await this.put(
        endpoints.booking_by_id(bookingId),
        booking,
        token
      );
      return updatedBooking;
    } catch (error) {
      console.error(`Failed to update booking: ${error}`);
      throw error;
    }
  }

  async patchBooking(
    bookingId: string,
    data: Record<string, any>,
    token: string
  ) {
    try {
      const updatedBooking = await this.patch(
        endpoints.booking_by_id(bookingId),
        data,
        token
      );
      return updatedBooking;
    } catch (error) {
      console.error(`Failed to patch booking: ${error}`);
      throw error;
    }
  }

  async deleteBooking(bookingId: string, token: string) {
    try {
      await this.delete(endpoints.booking_by_id(bookingId), token);
      return true;
    } catch (error) {
      console.warn(`Failed to delete booking`);
      return false;
    }
  }
}
export const APIFunctions = new ApiFunctions();
