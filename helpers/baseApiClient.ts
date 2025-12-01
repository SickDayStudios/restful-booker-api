import { request } from "@playwright/test";

export abstract class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl =
      baseUrl ||
      process.env.API_BASE_URL ||
      "https://restful-booker.herokuapp.com";
  }

  protected async get(endpoint: string) {
    const context = await request.newContext({
      baseURL: this.baseUrl,
    });
    const response = await context.get(endpoint);
    try {
      if (!response.ok()) {
        throw new Error(
          `GET ${endpoint} failed with status ${response.status()} ${response.statusText()}`
        );
      }
      // Try to parse as JSON, fall back to text if it fails
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } finally {
      await context.dispose();
    }
  }

  protected async post(endpoint: string, data: any, token?: string) {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Cookie'] = `token=${token}`;
    }
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: headers,
    });
    try {
      const response = await context.post(endpoint, { data });
      if (!response.ok()) {
        throw new Error(
          `POST ${endpoint} failed: ${response.status()} ${response.statusText()}`
        );
      }
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } finally {
      await context.dispose();
    }
  }

  protected async put(endpoint: string, data: any, token: string) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    };
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: headers,
    });
    try {
      const response = await context.put(endpoint, { data });
      if (!response.ok())
        throw new Error(
          `PUT ${endpoint} failed: ${response.status()} ${response.statusText()}`
        );
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } finally {
      context.dispose();
    }
  }

  protected async patch(endpoint: string, data: any, token: string) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    };
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: headers,
    });
    try {
      const response = await context.patch(endpoint, { data });
      if (!response.ok())
        throw new Error(
          `PATCH ${endpoint} failed: ${response.status()} ${response.statusText()}`
        );
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } finally {
      context.dispose();
    }
  }

  protected async delete(endpoint: string, token: string) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cookie': `token=${token}`
    };
    const context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: headers,
    });
    try {
      const response = await context.delete(endpoint);
      if (!response.ok())
        throw new Error(
          `DELETE ${endpoint} failed: ${response.status()} ${response.statusText()}`
        );
      try {
        return await response.json();
      } catch {
        return await response.text();
      }
    } finally {
      context.dispose();
    }
  }
}
