import { type Page, type Locator } from '@playwright/test';

export class Navbar {
  readonly loggedInAs: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly signupLoginLink: Locator;
  readonly cartLink: Locator;
  readonly productsLink: Locator;

  constructor(private page: Page) {
    this.loggedInAs = page.locator('.navbar-nav li:last-child a');
    this.logoutLink = page.locator('a[href="/logout"]');
    this.deleteAccountLink = page.locator('a[href="/delete_account"]');
    this.signupLoginLink = page.locator('a[href="/login"]');
    this.cartLink = page.locator('a[href="/view_cart"]').first();
    this.productsLink = page.locator('a[href="/products"]');
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async logout() {
    await this.logoutLink.click();
  }
}
