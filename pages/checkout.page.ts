import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly reviewOrderHeading: Locator;
  readonly commentArea: Locator;
  readonly placeOrderButton: Locator;

  constructor(private page: Page) {
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.reviewOrderHeading = page.getByText('Review Your Order');
    this.commentArea = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('.check_out');
  }

  async addComment(comment: string) {
    await this.commentArea.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
