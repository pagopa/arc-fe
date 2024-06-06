// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:1234/');
  await page.getByRole("button", { name: 'Accetta tutti' }).click();
});

test('has a title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("TODO PagoPA checkout evoluto");
});

test('has a welcome text', async ({ page }) => {
  // Expect to find a welcome text.
  await expect(page.getByText('Ciao, John Doe', { exact: true })).toBeVisible();
});

test('payment button works', async ({ page }) => {
  // New tab Promise
  const newTabPromise = page.waitForEvent('popup');

  // Click the payment button.
  await page.getByRole("link", { name: 'Paga un avviso' }).click();

  // New tab Promise
  const newTab = await newTabPromise;
  await newTab.waitForLoadState();

  await expect(newTab).toHaveURL("https://uat.checkout.pagopa.it/");
});
