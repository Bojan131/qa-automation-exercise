import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
  readonly heading: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productList: Locator;

  constructor(private page: Page) {
    this.heading = page.locator('.features_items h2.title');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productList = page.locator('.features_items .col-sm-4');
  }

  async goto() {
    await this.page.goto('/products');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async addProductToCart(productId: number) {
    const addButton = this.page.locator(
      `.productinfo .add-to-cart[data-product-id="${productId}"]`
    );
    await addButton.click();
  }

  async clickContinueShopping() {
    await this.page.locator('.btn-success.close-modal').click();
  }

  async addProductAndContinue(productId: number) {
    await this.addProductToCart(productId);
    await this.clickContinueShopping();
  }

  async addProductAndViewCart(productId: number) {
    await this.addProductToCart(productId);
    await this.page.locator('#cartModal a[href="/view_cart"]').click();
  }
}
