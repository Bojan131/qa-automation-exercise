import { test, expect } from '@playwright/test';

const API_URL = 'https://automationexercise.com/api';

test.describe('Products API', () => {
  test('get all products returns a list', async ({ request }) => {
    const response = await request.get(`${API_URL}/productsList`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products).toBeTruthy();
    expect(body.products.length).toBeGreaterThan(0);

    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
  });

  test('search products with a valid term returns matching results', async ({ request }) => {
    const response = await request.post(`${API_URL}/searchProduct`, {
      form: { search_product: 'top' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);

    // Each result should still have the standard product shape
    for (const product of body.products) {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('category');
    }
  });

  test('search without search_product param returns 400', async ({ request }) => {
    const response = await request.post(`${API_URL}/searchProduct`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('search_product parameter is missing');
  });

  test('POST to products list returns 405', async ({ request }) => {
    const response = await request.post(`${API_URL}/productsList`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toContain('This request method is not supported');
  });
});
