// @ts-check
import { test, expect } from '@playwright/test';

/* These test to open the official playwright website, it is not required for our testing
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

//---------------------------------------
// Tests developed by Guan Ying
// login
// npx playwright test --project=webkit --headed
test('login', async ({ page }) => {
  await page.goto('http://localhost:8081/B/selectCountry.html');
  await page.locator('a:has-text("Singapore")').click();
  await page.locator('a:has-text("Login/Register")').click();

  // login
  await page.fill("#emailLogin", "dramatictan69@gmail.com");
  await page.fill("#passwordLogin", "12345678");
  await page.click('input[type="submit"]');
})

// Edit user information (e.g. Name, Phone, Address, Country, Security Question, Age, Income without changing password)
test('edit personal information', async ({ page }) => {
  await page.goto('http://localhost:8081/B/selectCountry.html');
  await page.locator('a:has-text("Singapore")').click();
  await page.locator('a:has-text("Login/Register")').click();

  // login
  await page.fill("#emailLogin", "dramatictan69@gmail.com");
  await page.fill("#passwordLogin", "12345678");
  await page.click('input[type="submit"]');

  // fill in fields
  await page.fill("#name", "Tan Guan Ying");
  await page.fill("#phone", "91234567");
  await page.selectOption("#country", "Singapore");
  await page.fill("#address", "Blk 123");
  await page.fill("#securityAnswer", "Mom");
  await page.fill("#age", '20');
  await page.fill("#income", "1200");

  const slaCheckbox = page.locator("#serviceLevelAgreement");
  if (!(await slaCheckbox.isChecked())) {
    await slaCheckbox.check();
  }

  // click submit button
  await page.click('input[type="submit"]');

  // detect Fields updated and a status stating, “Successfully Updated!”
  await expect(page.locator('#goodDiv')).toHaveText('Successfully Updated!');
})

// enter password and update it, then log out and relogin with new password
test('update password', async ({ page }) => {
  await page.goto('http://localhost:8081/B/selectCountry.html');
  await page.locator('a:has-text("Singapore")').click();
  await page.locator('a:has-text("Login/Register")').click();

  // login
  await page.fill("#emailLogin", "dramatictan69@gmail.com");
  await page.fill("#passwordLogin", "12345678");
  await page.click('input[type="submit"]');

  /** REFERNECE HTML CODE
    <div class="form-group">
        <label>Old Password (leave blank unless setting a new password).</label>
        <input class="form-control" type="password" id="oldPassword">
    </div>
    <div class="form-group">
        <label>New Password<br/>Password to be at least 8 characters long.</label>
        <input class="form-control" type="password" id="password">
    </div>
    <div class="form-group">
        <label>Re-enter New Password</label>
        <input class="form-control" type="password" id="repassword">
    </div>
   */

  // fill in password fields
  await page.fill("#oldPassword", "12345678");
  await page.fill("#password", "I_Love_SEP01!");
  await page.fill("#repassword", "I_Love_SEP01!");

  // click submit button
  await page.click('input[type="submit"]');

  // detect Fields updated and a status stating, “Successfully Updated!”
  await expect(page.locator('#goodDiv')).toHaveText('Successfully Updated!');

  // logout and login with new password
  await page.locator('a:has-text("Logout")').click();
  await page.fill("#emailLogin", "dramatictan69@gmail.com");
  await page.fill("#passwordLogin", "I_Love_SEP01!");
  await page.click('input[type="submit"]');
})

// enter password and update it, then log out and relogin with new password
// npx playwright test -g 'reset test'
test('reset test', async ({ page }) => {
  await page.goto('http://localhost:8081/B/selectCountry.html');
  await page.locator('a:has-text("Singapore")').click();
  await page.locator('a:has-text("Login/Register")').click();

  // login
  await page.fill("#emailLogin", "dramatictan69@gmail.com");
  await page.fill("#passwordLogin", "I_Love_SEP01!");
  await page.click('input[type="submit"]');

  // fill in password fields
  await page.fill("#oldPassword", "I_Love_SEP01!");
  await page.fill("#password", "12345678");
  await page.fill("#repassword", "12345678");

  // click submit button
  await page.click('input[type="submit"]');

  // detect Fields updated and a status stating, “Successfully Updated!”
  await expect(page.locator('#goodDiv')).toHaveText('Successfully Updated!');

  // logout 
  await page.locator('a:has-text("Logout")').click();
})