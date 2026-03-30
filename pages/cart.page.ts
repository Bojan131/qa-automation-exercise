import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly cartTable: Locator;
  readonly checkoutButton: Locator;
  readonly emptyCartMessage: Locator;

  constructor(private page: Page) {
    this.cartTable = page.locator('#cart_info_table');
    this.checkoutButton = page.locator('.check_out');
    this.emptyCartMessage = page.locator('#empty_cart');
  }

  async goto() {
    await this.page.goto('/view_cart');
  }

  getCartRow(productId: number) {
    return this.page.locator(`#product-${productId}`);
  }

  getProductName(productId: number): Locator {
    return this.getCartRow(productId).locator('.cart_description h4 a');
  }

  getProductPrice(productId: number): Locator {
    return this.getCartRow(productId).locator('.cart_price p');
  }

  getProductQuantity(productId: number): Locator {
    return this.getCartRow(productId).locator('.cart_quantity button');
  }

  getProductTotal(productId: number): Locator {
    return this.getCartRow(productId).locator('.cart_total p');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
