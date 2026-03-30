import { type Page, type Locator } from '@playwright/test';
import { cardDetails } from '../utils/test-data';

export class PaymentPage {
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;

  constructor(private page: Page) {
    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  }

  async fillCardDetails() {
    await this.nameOnCardInput.fill(cardDetails.nameOnCard);
    await this.cardNumberInput.fill(cardDetails.cardNumber);
    await this.cvcInput.fill(cardDetails.cvc);
    await this.expiryMonthInput.fill(cardDetails.expiryMonth);
    await this.expiryYearInput.fill(cardDetails.expiryYear);
  }

  async payAndConfirm() {
    await this.fillCardDetails();
    await this.payButton.click();
  }
}
