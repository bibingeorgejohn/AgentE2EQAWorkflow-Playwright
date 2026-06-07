# E-commerce Checkout Test Plan (Swag Labs)

This document contains the functional and non-functional test cases for the Swag Labs e-commerce checkout flow, covering acceptance criteria AC1 through AC5 and all associated business rules.

---

## 🛠️ Test Environment & Credentials
- **Application URL**: [https://www.saucedemo.com](https://www.saucedemo.com)
- **Test User**: `standard_user`
- **Password**: `secret_sauce`

---

## 📋 Test Scenarios

### Scenario 1: Happy Path E-commerce Checkout Flow (AC1, AC2, AC3, AC4)
- **Description**: Verify a user can successfully purchase items by completing the full checkout flow.
- **Preconditions**: User is logged in and has added "Sauce Labs Backpack" ($29.99) and "Sauce Labs Bike Light" ($9.99) to the cart.
- **Test Data**:
  - First Name: `John`
  - Last Name: `Doe`
  - Postal Code: `12345`

#### Step-by-Step Instructions:
1. Click on the shopping cart badge icon to navigate to the Cart page (`/cart.html`).
   - *Expected Result*: The Cart page is displayed. Both "Sauce Labs Backpack" and "Sauce Labs Bike Light" are visible with correct prices ($29.99 and $9.99) and quantity 1.
2. Click the `#checkout` button.
   - *Expected Result*: Redirected to the Checkout Info page (`/checkout-step-one.html`). Form fields for First Name, Last Name, and Zip/Postal Code are visible.
3. Enter `John` into the First Name field, `Doe` into the Last Name field, and `12345` into the Zip/Postal Code field. Click the `#continue` button.
   - *Expected Result*: Redirected to the Checkout Overview page (`/checkout-step-two.html`).
4. Verify the checkout overview details:
   - Check item names, descriptions, and prices.
   - Verify the Item Total subtotal is exactly `$39.98`.
   - Verify the Tax is `$3.20` (approx. 8% of subtotal).
   - Verify the Total is `$43.18` (Item Total + Tax).
   - *Expected Result*: All details, item list, and calculated price fields are accurate and visible.
5. Click the `#finish` button.
   - *Expected Result*: Redirected to the Checkout Complete page (`/checkout-complete.html`).
6. Verify the success message is visible:
   - Title header: `Checkout: Complete!`
   - Complete header: `Thank you for your order!`
   - Complete text: `Your order has been dispatched, and will arrive just as fast as the pony can get there!`
   - Back Home button: `#back-to-products` is visible.
7. Click the `#back-to-products` button.
   - *Expected Result*: User is returned to the products catalog page (`/inventory.html`) and the shopping cart badge is cleared (empty).

---

### Scenario 2: Checkout Form Validation (AC2, AC5, Business Rule 1)
- **Description**: Verify that all checkout fields are mandatory and that proper error messages are shown for blank entries.
- **Preconditions**: User is logged in, has items in the cart, and is on the Checkout Info page (`/checkout-step-one.html`).
- **Test Data**: None required initially.

#### Test Case 2.1: Submit empty checkout form
1. Leave all fields empty and click the `#continue` button.
   - *Expected Result*: Form is not submitted. Error container `.error-message-container` is displayed with message: `"Error: First Name is required"`.

#### Test Case 2.2: Submit checkout form with empty Last Name
1. Enter `John` in the First Name field, leave Last Name and Zip/Postal Code blank, and click the `#continue` button.
   - *Expected Result*: Form is not submitted. Error container `.error-message-container` is displayed with message: `"Error: Last Name is required"`.

#### Test Case 2.3: Submit checkout form with empty Zip/Postal Code
1. Enter `John` in the First Name field, `Doe` in the Last Name field, leave Zip/Postal Code blank, and click the `#continue` button.
   - *Expected Result*: Form is not submitted. Error container `.error-message-container` is displayed with message: `"Error: Postal Code is required"`.

---

### Scenario 3: Cart Review Page Options (AC1)
- **Description**: Verify the navigation options available on the Cart review page.
- **Preconditions**: User is logged in, has added the "Sauce Labs Backpack" to the cart, and is on the Cart page (`/cart.html`).

#### Step-by-Step Instructions:
1. Verify the "Continue Shopping" button (`#continue-shopping`) is visible.
2. Click the `#continue-shopping` button.
   - *Expected Result*: User is redirected back to the inventory page (`/inventory.html`), and the cart keeps the added items (badge shows `1`).

---

### Scenario 4: Cancel Checkout Flows (Business Rule 5)
- **Description**: Verify that the checkout flow can be cancelled at any step, returning the user to the correct page.
- **Preconditions**: User is logged in, has items in the cart.

#### Test Case 4.1: Cancel on Checkout Info Page
1. Navigate to the Checkout Info page (`/checkout-step-one.html`).
2. Click the Cancel button (`#cancel`).
   - *Expected Result*: Redirected back to the Cart page (`/cart.html`). Cart contents are preserved.

#### Test Case 4.2: Cancel on Checkout Overview Page
1. Fill in valid checkout information and continue to the Checkout Overview page (`/checkout-step-two.html`).
2. Click the Cancel button (`#cancel`).
   - *Expected Result*: Redirected back to the inventory page (`/inventory.html`). Cart contents are preserved.

---

### Scenario 5: Checkout Restriction with Empty Cart (Business Rule 3)
- **Description**: Verify that the checkout flow enforces that the cart cannot be empty.
- **Preconditions**: User is logged in, cart is empty.

#### Step-by-Step Instructions:
1. Navigate to the Cart page (`/cart.html`) with no items in the cart.
2. Click the Checkout button (`#checkout`).
   - *Expected Result*: The application should restrict checkout (e.g. either show an error or prevent clicking checkout). If the app allows navigation to `/checkout-step-one.html`, the automation script must assert this behavior and flag any gaps in empty-cart validations.

---

### Scenario 6: Order Completion Clears Cart (Business Rule 4)
- **Description**: Verify that completing the checkout process successfully empties the cart.
- **Preconditions**: User is logged in, has completed checkout by clicking "Finish".

#### Step-by-Step Instructions:
1. From the confirmation screen (`/checkout-complete.html`), verify the shopping cart badge is not displayed or has text value `0`.
2. Click the "Back Home" button (`#back-to-products`).
3. Verify that the shopping cart badge remains empty.
   - *Expected Result*: Cart is successfully cleared.
