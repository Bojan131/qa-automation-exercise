import { type Page, type Locator } from '@playwright/test';

export class AccountCreatedPage {
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.heading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
