import { type Page, type Locator } from '@playwright/test';

export class OrderPlacedPage {
  readonly heading: Locator;
  readonly continueButton: Locator;
  readonly downloadInvoice: Locator;

  constructor(private page: Page) {
    this.heading = page.locator('[data-qa="order-placed"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.downloadInvoice = page.getByText('Download Invoice');
  }
}
