import { request, APIRequestContext } from '@playwright/test';

export async function createApiClient(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: 'https://petstore.swagger.io/v2',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api_key': 'special-key'
    }
  });
}
