# Exploratory Testing Report

## Charter

Explore the checkout flow, product interactions, and account management on automationexercise.com to find usability issues, data inconsistencies, or broken functionality.

**Duration**: ~30 minutes
**Environment**: Chrome 146, macOS

---

## Findings

### 1. Aggressive ad overlays block user interaction

**Severity**: High
**Priority**: High

Full-screen Google Vignette ads appear after key actions like clicking "Continue" on the Account Created page. These ads cover the entire viewport and require manually finding and clicking a small "Close ad" button. There is no way for a regular user to predict when these will appear.

**Impact**: Users may think the page is broken or leave the site. In test automation, this causes consistent flakiness unless ads are explicitly handled.

**Steps to reproduce**:
1. Register a new account
2. On the "Account Created" page, click "Continue"
3. A full-screen ad overlay appears, blocking navigation to the homepage

---

### 2. No client-side validation on the registration form

**Severity**: Medium
**Priority**: Medium

The signup form accepts any value for the password field -- there's no minimum length, no complexity requirement, and no feedback to the user about password strength. A user can create an account with a single-character password like "a".

**Impact**: Weak passwords leave accounts vulnerable. From a QA perspective, the absence of validation means edge-case inputs can reach the server unchecked.

**Steps to reproduce**:
1. Go to Signup / Login
2. Enter a name and email, click Signup
3. In the password field, type "a"
4. Fill in required address fields and click Create Account
5. Account is created successfully with no warning

---

### 3. Copyright year is outdated

**Severity**: Low
**Priority**: Low

The footer shows "Copyright 2021 All rights reserved" across all pages. This is a minor credibility issue -- users may question whether the site is actively maintained.

**Where**: Footer on every page.

---

### 4. Cart allows adding the same product multiple times without consolidation

**Severity**: Low
**Priority**: Low

When you add the same product to the cart multiple times from the products page (by clicking "Add to cart" repeatedly), each click adds a new row instead of incrementing the quantity of the existing row. This is inconsistent with how the quantity selector works on the product detail page, where you set a quantity before adding.

**Steps to reproduce**:
1. Go to Products
2. Click "Add to cart" on Blue Top, click "Continue Shopping"
3. Click "Add to cart" on Blue Top again
4. View the cart -- Blue Top appears as one row with quantity 2, but the UX flow is confusing because the modal gives no indication the quantity was incremented

---

## Summary

The site is functional for its core flows but has real usability issues around ad intrusiveness and form validation. The ad problem is the most significant finding because it directly affects both end users and test automation reliability. The missing password validation is a real security gap. The other issues are cosmetic but show a lack of polish.

## What I would explore next

- Payment form validation (does it accept invalid card numbers?)
- Search with special characters and SQL injection patterns
- Behavior when navigating directly to checkout without a cart
- Session handling across tabs
