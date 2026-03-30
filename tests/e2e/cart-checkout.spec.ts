import { test, expect } from '../../fixtures/auth.fixture';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { PaymentPage } from '../../pages/payment.page';
import { OrderPlacedPage } from '../../pages/order-placed.page';

test.describe('Cart and Checkout', () => {
  test('user adds products to cart and checks prices', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await productsPage.goto();

    // Add two products: Blue Top (id=1, Rs. 500) and Men Tshirt (id=2, Rs. 400)
    await productsPage.addProductAndContinue(1);
    await productsPage.addProductAndViewCart(2);

    await expect(cartPage.getProductName(1)).toHaveText('Blue Top');
    await expect(cartPage.getProductPrice(1)).toHaveText('Rs. 500');
    await expect(cartPage.getProductQuantity(1)).toHaveText('1');
    await expect(cartPage.getProductTotal(1)).toHaveText('Rs. 500');

    await expect(cartPage.getProductName(2)).toHaveText('Men Tshirt');
    await expect(cartPage.getProductPrice(2)).toHaveText('Rs. 400');
    await expect(cartPage.getProductQuantity(2)).toHaveText('1');
    await expect(cartPage.getProductTotal(2)).toHaveText('Rs. 400');
  });

  test('user completes full checkout flow', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);
    const orderPlacedPage = new OrderPlacedPage(page);

    await productsPage.goto();
    await productsPage.addProductAndViewCart(1);

    await cartPage.proceedToCheckout();

    await expect(checkoutPage.reviewOrderHeading).toBeVisible();
    await expect(checkoutPage.deliveryAddress).toContainText('123 Test Street');
    await checkoutPage.placeOrder();

    await paymentPage.payAndConfirm();

    await expect(orderPlacedPage.heading).toBeVisible();
    await expect(orderPlacedPage.heading).toContainText('Order Placed!');
  });
});
