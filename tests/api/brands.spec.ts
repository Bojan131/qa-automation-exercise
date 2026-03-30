import { test, expect } from '@playwright/test';

const API_URL = 'https://automationexercise.com/api';

test.describe('Brands API', () => {
  test('get all brands returns a list', async ({ request }) => {
    const response = await request.get(`${API_URL}/brandsList`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.brands).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrand = body.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });

  test('PUT to brands list returns 405', async ({ request }) => {
    const response = await request.put(`${API_URL}/brandsList`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported');
  });
});
