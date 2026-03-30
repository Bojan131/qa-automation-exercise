import { test, expect } from '@playwright/test';
import { generateUserEmail, testUser } from '../../utils/test-data';

const API_URL = 'https://automationexercise.com/api';

test.describe.serial('User Account API', () => {
  const email = generateUserEmail();
  const password = testUser.password;

  test('create a new user account', async ({ request }) => {
    const response = await request.post(`${API_URL}/createAccount`, {
      form: {
        name: testUser.name,
        email,
        password,
        title: testUser.title,
        birth_date: testUser.birth_date,
        birth_month: testUser.birth_month,
        birth_year: testUser.birth_year,
        firstname: testUser.firstname,
        lastname: testUser.lastname,
        company: testUser.company,
        address1: testUser.address1,
        address2: testUser.address2,
        country: testUser.country,
        zipcode: testUser.zipcode,
        state: testUser.state,
        city: testUser.city,
        mobile_number: testUser.mobile_number,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

  test('verify login with valid credentials', async ({ request }) => {
    const response = await request.post(`${API_URL}/verifyLogin`, {
      form: { email, password },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('verify login with invalid credentials returns 404', async ({ request }) => {
    const response = await request.post(`${API_URL}/verifyLogin`, {
      form: { email: 'nobody@nowhere.com', password: 'wrong' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe('User not found!');
  });

  test('verify login without email returns 400', async ({ request }) => {
    const response = await request.post(`${API_URL}/verifyLogin`, {
      form: { password: 'something' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toContain('email or password parameter is missing');
  });

  test('get user detail by email', async ({ request }) => {
    const response = await request.get(`${API_URL}/getUserDetailByEmail`, {
      params: { email },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);

    const user = body.user;
    expect(user.name).toBe(testUser.name);
    expect(user.email).toBe(email);
    expect(user.first_name).toBe(testUser.firstname);
    expect(user.last_name).toBe(testUser.lastname);
  });

  test('update user account', async ({ request }) => {
    const response = await request.put(`${API_URL}/updateAccount`, {
      form: {
        name: testUser.name,
        email,
        password,
        title: testUser.title,
        birth_date: testUser.birth_date,
        birth_month: testUser.birth_month,
        birth_year: testUser.birth_year,
        firstname: 'Updated',
        lastname: testUser.lastname,
        company: testUser.company,
        address1: testUser.address1,
        address2: testUser.address2,
        country: testUser.country,
        zipcode: testUser.zipcode,
        state: testUser.state,
        city: testUser.city,
        mobile_number: testUser.mobile_number,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User updated!');

    // Verify the change persisted
    const detail = await request.get(`${API_URL}/getUserDetailByEmail`, {
      params: { email },
    });
    const detailBody = await detail.json();
    expect(detailBody.user.first_name).toBe('Updated');
  });

  test('delete user account', async ({ request }) => {
    const response = await request.delete(`${API_URL}/deleteAccount`, {
      form: { email, password },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('Account deleted!');
  });
});
