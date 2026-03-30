import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { AccountCreatedPage } from '../pages/account-created.page';
import { generateUserEmail, testUser } from '../utils/test-data';

const API_URL = 'https://automationexercise.com/api';

type AuthFixtures = {
  loggedInPage: Page;
  userEmail: string;
};

export const test = base.extend<AuthFixtures>({
  userEmail: async ({}, use) => {
    await use(generateUserEmail());
  },

  loggedInPage: async ({ page, userEmail }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.startSignup(testUser.name, userEmail);

    const signupPage = new SignupPage(page);
    await signupPage.fillAndSubmit(testUser.password);

    const accountCreated = new AccountCreatedPage(page);
    await accountCreated.clickContinue();

    await page.waitForURL('**/');

    await use(page);

    // Cleanup via API -- more reliable than navigating in the browser
    await page.request.delete(`${API_URL}/deleteAccount`, {
      form: { email: userEmail, password: testUser.password },
    });
  },
});

export { expect } from '@playwright/test';
