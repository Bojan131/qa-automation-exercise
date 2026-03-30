import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { SignupPage } from '../../pages/signup.page';
import { AccountCreatedPage } from '../../pages/account-created.page';
import { Navbar } from '../../pages/components/navbar.component';
import { generateUserEmail, testUser } from '../../utils/test-data';

const API_URL = 'https://automationexercise.com/api';

test.describe('Authentication', () => {
  test('user registers a new account', async ({ page }) => {
    const email = generateUserEmail();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.signupHeading).toBeVisible();

    await loginPage.startSignup(testUser.name, email);

    const signupPage = new SignupPage(page);
    await expect(signupPage.heading).toBeVisible();

    await signupPage.fillAndSubmit(testUser.password);

    const accountCreated = new AccountCreatedPage(page);
    await expect(accountCreated.heading).toBeVisible();
    await accountCreated.clickContinue();

    const navbar = new Navbar(page);
    await expect(navbar.loggedInAs).toContainText(testUser.name);

    // Cleanup via API
    await page.request.delete(`${API_URL}/deleteAccount`, {
      form: { email, password: testUser.password },
    });
  });

  test('user logs in with valid credentials', async ({ page }) => {
    const email = generateUserEmail();

    await page.request.post(`${API_URL}/createAccount`, {
      form: {
        name: testUser.name,
        email,
        password: testUser.password,
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

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, testUser.password);

    const navbar = new Navbar(page);
    await expect(navbar.loggedInAs).toContainText(testUser.name);

    // Cleanup via API
    await page.request.delete(`${API_URL}/deleteAccount`, {
      form: { email, password: testUser.password },
    });
  });

  test('user sees error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.loginHeading).toBeVisible();

    await loginPage.login('fake@invalid.com', 'wrongpassword');

    await expect(loginPage.errorMessage).toHaveText(
      'Your email or password is incorrect!'
    );
  });
});
