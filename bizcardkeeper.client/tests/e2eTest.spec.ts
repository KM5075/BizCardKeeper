import { test, expect } from "@playwright/test";

test("Target Page Test", async ({ page }) => {
  await page.goto("https://localhost:54856");

  // Get user button and click it
  const userButton = page.locator('button:has-text("Normal User")');
  await userButton.click();

  // Click on login button
  const loginButton = page.locator('button:has-text("Login")');
  await loginButton.click();

  await expect(page).toHaveURL("https://localhost:54856/home");

  // Input target ID
  const inputField = page.locator('input[placeholder="ID"]');
  await inputField.fill("1");

  // Click on display button
  const displayButton = page.locator('button:has-text("Display Card")');
  await displayButton.click();

  await expect(page).toHaveURL("https://localhost:54856/cards/1");
  // Check if the card is displayed by checking the value not null
  const cardTitle = page.locator("h1").first();
  await expect(cardTitle).not.toBeNull();
  await expect(cardTitle).toBeVisible();
});
