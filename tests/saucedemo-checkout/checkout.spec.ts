import { test, expect } from '@playwright/test';

test.describe('Swag Labs E-commerce Checkout Flow', () => {
  // Login beforeEach hook
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Perform login
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Assert successful login by checking inventory container
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('Scenario 1: Happy Path E-commerce Checkout Flow', async ({ page }) => {
    // 1. Add Backpack and Bike Light to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    
    // Verify badge shows 2
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    
    // Navigate to Cart page
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Verify cart items and prices
    await expect(page.locator('.cart_item')).toHaveCount(2);
    await expect(page.locator('.cart_item').nth(0)).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.cart_item').nth(0).locator('.inventory_item_price')).toHaveText('$29.99');
    await expect(page.locator('.cart_item').nth(1)).toContainText('Sauce Labs Bike Light');
    await expect(page.locator('.cart_item').nth(1).locator('.inventory_item_price')).toHaveText('$9.99');
    
    // 2. Click Checkout
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    // 3. Fill in checkout details
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    
    // 4. Verify Checkout Overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    await expect(page.locator('.cart_item')).toHaveCount(2);
    
    // Verify pricing details
    await expect(page.locator('.summary_subtotal_label')).toContainText('Item total: $39.98');
    await expect(page.locator('.summary_tax_label')).toContainText('Tax: $3.20');
    await expect(page.locator('.summary_total_label')).toContainText('Total: $43.18');
    
    // 5. Click Finish
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    
    // 6. Verify success page components
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    
    // 7. Click Back Home
    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify shopping cart badge is cleared
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('Scenario 2.1: Checkout Form Validation - Empty Form', async ({ page }) => {
    // Navigate to Cart and Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Click Continue without filling any fields
    await page.locator('[data-test="continue"]').click();
    
    // Verify validation error
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Error: First Name is required');
  });

  test('Scenario 2.2: Checkout Form Validation - Missing Last Name', async ({ page }) => {
    // Navigate to Cart and Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Fill first name, leave last name empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="continue"]').click();
    
    // Verify validation error
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Error: Last Name is required');
  });

  test('Scenario 2.3: Checkout Form Validation - Missing Postal Code', async ({ page }) => {
    // Navigate to Cart and Checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Fill first and last name, leave postal code empty
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="continue"]').click();
    
    // Verify validation error
    const errorContainer = page.locator('[data-test="error"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText('Error: Postal Code is required');
  });

  test('Scenario 3: Cart Review Page - Continue Shopping Navigation', async ({ page }) => {
    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Go to Cart
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/.*cart.html/);
    
    // Click Continue Shopping
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // Verify item is still in cart
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Scenario 4.1: Cancel Checkout - Cancel on Checkout Info page', async ({ page }) => {
    // Add item and go to Cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    
    // Proceed to checkout info
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
    
    // Click Cancel
    await page.locator('[data-test="cancel"]').click();
    
    // Assert redirect back to Cart
    await expect(page).toHaveURL(/.*cart.html/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Scenario 4.2: Cancel Checkout - Cancel on Checkout Overview page', async ({ page }) => {
    // Add item, go to Cart, click checkout
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    
    // Fill in valid details and continue
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    
    // Click Cancel on overview
    await page.locator('[data-test="cancel"]').click();
    
    // Assert redirect back to products catalog inventory.html
    await expect(page).toHaveURL(/.*inventory.html/);
    // Verify cart still contains the item
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Scenario 5: Checkout Restriction with Empty Cart (Business Rule 3 Gap)', async ({ page }) => {
    // Go to cart with no items added
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    
    // Click checkout
    await page.locator('[data-test="checkout"]').click();
    
    // Check if the application allows navigation to checkout-step-one.html
    // Note: The Swag Labs application has a known business logic gap where it allows proceeding to checkout with an empty cart.
    // We expect it to navigate, but we flag this as a potential business rule violation.
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });
});
