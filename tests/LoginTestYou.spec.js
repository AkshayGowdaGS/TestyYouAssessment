// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.testyou.in/Login.aspx') ;
});

test.describe('Login', () => {
  test('TY_TC_01 Validate User is able to Login in with Valid Credenctials.', async ({ page }) => {
    
    await page.locator('#ctl00_CPHContainer_txtUserLogin').fill('akshay12345@gmail.com')
    await page.locator('#ctl00_CPHContainer_txtPassword').fill('Test@123')
    await page.locator("input[name='ctl00$CPHContainer$btnLoginn']").isVisible()
    
  });

  test('TY_TC_02 Validate user should not be able to Login with invalid Credenctials.', async ({ page }) => {
    
    await page.locator('#ctl00_CPHContainer_txtUserLogin').fill('akshay12345@gmail.com')
    await page.locator('#ctl00_CPHContainer_txtPassword').fill('Test@')
    await page.locator("input[name='ctl00$CPHContainer$btnLoginn']").click()
    await page.locator('#ctl00_CPHContainer_lblOutput').isVisible()
  });


  test('TY_TC_03 Validate user is able to click on Forgot Password Link.', async ({ page }) => {
    const text = "Forgot your password"
    await page.locator('#ctl00_CPHContainer_hprlnkForgetPassword').click()
    const forgetText = await page.locator('div[class="grid_15 push_5 clearfix"] div.ribbion_box.clearfix span')
    await expect(forgetText).toHaveText(text);
  });

  test('TY_TC_04 Validate user click on forget password link, in the forget password section EmailID Text field, Submit button should be displayed.', async ({ page }) => {
    const text = "Forgot your password"
    await page.locator('#ctl00_CPHContainer_hprlnkForgetPassword').click()
    const forgetText = await page.locator('div[class="grid_15 push_5 clearfix"] div.ribbion_box.clearfix span')
    await expect(forgetText).toHaveText(text);
    await page.locator('#ctl00_CPHContainer_txtEmailId').isDisabled()
    await page.locator('#ctl00_CPHContainer_btnChangePassword').isDisabled()
  });

  test('TY_TC_05 Validate user click on forget password link enter invalid email Id /Login ID, Click on submit button, Error message should be displayed.', async ({ page }) => {
    const text = "Forgot your password"
    await page.locator('#ctl00_CPHContainer_hprlnkForgetPassword').click()
    const forgetText = await page.locator('div[class="grid_15 push_5 clearfix"] div.ribbion_box.clearfix span')
    await expect(forgetText).toHaveText(text);
    await page.locator('#ctl00_CPHContainer_txtEmailId').isDisabled()
    await page.locator('#ctl00_CPHContainer_btnChangePassword').isDisabled()
    await page.locator('#ctl00_CPHContainer_txtEmailId').fill('akshay12345@gmail.com')
    await page.locator('#ctl00_CPHContainer_btnChangePassword').click()
    const acountNotactivated = await page.locator('#ctl00_CPHContainer_lblOutput')
    await expect(acountNotactivated).toHaveText("Incorrect Email-ID / LoginId OR Your Account Not Activated Please do activate your account !")

  });

  test('TY_TC_06 Validate user is able to click on Forgot Password Link.', async ({ page }) => {
    await page.locator("//a[text()='Terms & Conditions ']").isVisible
  });

  test('TY_TC_07 Validate user is able Click on Terms & Condtion Link should be navigated to Terms & Condtion page.', async ({ page }) => {
    await page.locator("//a[text()='Terms & Conditions ']").click()
    await page.locator("div.container_24 .mainnote:nth-child(1)").isVisible()
  });

  test('TY_TC_08 Validate when user Enter loginId and click on login button without password', async ({ page }) => {
    await page.locator('#ctl00_CPHContainer_txtUserLogin').fill('akshay12345@gmail.com')
    await page.locator("input[name='ctl00$CPHContainer$btnLoginn']").click()
    const enterloginpassword = await page.locator("#ctl00_CPHContainer_valsAll")
    await expect(enterloginpassword).toHaveText("		Enter Login Password ,  ")
  });

  test('TY_TC_09 Validate when user Enter Password and click on login button without LoginId', async ({ page }) => {
    await page.locator('#ctl00_CPHContainer_txtPassword').fill('Test@123')
    await page.locator("input[name='ctl00$CPHContainer$btnLoginn']").click()
    const enterloginId = await page.locator("#ctl00_CPHContainer_valsAll")
    await expect(enterloginId).toHaveText("  Enter Login Id ,  ")
  });

  test('TY_TC_10 Validate user is able to view the following componets in login page,LoginId Text field,Password Text field,Login Button,Terms & Conditions Link', async ({ page }) => {
    await page.locator('#ctl00_CPHContainer_txtUserLogin').isDisabled()
    await page.locator('#ctl00_CPHContainer_txtPassword').isDisabled()
    await page.locator("input[name='ctl00$CPHContainer$btnLoginn']").isDisabled()
    await page.locator("//a[text()='Terms & Conditions ']").isVisible

  });


});
