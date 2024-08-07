import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";
import LandingPage from "../pageobjects/landing.page.js";
import * as helpers from "../../helpers/helpers.js";
import dynamicLoadingPage from "../pageobjects/dynamicLoading.page.js";

describe("Chapter 5: Alter Egos: The Click Wrapper - Buring wait time of Dynamically Loaded elements with spinner check embedded in clickAdv()", () => {
  // Example 1: Element on page that is hidden
  it(`Clicks Start with clickAdv() which waits for spinner before hidden "Hello World" is displayed`, async () => {
    await LandingPage.open();
    await LandingPage.navToDynamicLoading();

    // Click Hidden Element Start which displays a spinner with hidden "Hello World"
    // Flashes the spinner while waiting to disappear without additional wait commands
    await dynamicLoadingPage.clickStartWithHiddenElementAndSpinner();

    //Verify the hidden Hello World text appears after the spinner disappeared
    await expect(dynamicLoadingPage.txtHelloWorld).toHaveText(expect.stringContaining("Hello World"));

    //Highlight the Hello World text
    await helpers.highlightOn(await dynamicLoadingPage.txtHelloWorld);
    await helpers.pause(5000);
    await helpers.highlightOff(await dynamicLoadingPage.txtHelloWorld);
  });

  // Example 2: Element rendered after the fact
  it(`Clicks Start with clickadv which waits for spinner before "Hello World" is rendered`, async () => {
    await LandingPage.open();
    await LandingPage.navToDynamicLoading();

    // Click Hidden Element Start which displays a spinner before rendereing "Hello World"
    // Flashes the spinner while waiting to disappear without additional wait commands
    await dynamicLoadingPage.clickStartWithRenderedElementAndSpinner();

    //Verify the Hello World text was rendered after the spinner disappeared
    await expect(dynamicLoadingPage.txtHelloWorld).toHaveText(expect.stringContaining("Hello World"));

    //Highlight the Hello World text for 5 seconds
    await helpers.highlightOn(await dynamicLoadingPage.txtHelloWorld);
    await helpers.pause(5000);
    await helpers.highlightOff(await dynamicLoadingPage.txtHelloWorld);
  });
});

describe("Chapter 5: Intentional Fail Last clickAdv with pageSync and autoscroll", () => {

  it("should login with valid credentials", async () => {
    await LoginPage.open();
    await LoginPage.loginAdv("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
  });
});

describe("Chapter 5: Intentional Fail Last clickAdv", () => {

  it("will fail as the last element in loginFailLast() is a 'bogus' element", async () => {
    await LoginPage.open();

    // This line fails because the last element clicked in loginFailLast() is a non-existant 'bogus' element
    await LoginPage.loginFailLast("tomsmith", "SuperSecretPassword!");

    // These lines do not execute because the previous line fails
    await expect(await SecurePage.flashAlert).toBeExisting();
    await expect(await SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
  });
});

describe("Chapter 5: Pass with clickAdvIfExists", () => {

  it("will pass as the element before Submit in loginFailFirstIfExists() is soft assert 'bogus' element", async () => {
    LoginPage.open();
    await LoginPage.loginFailFirstIfExists("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
  });
});

describe("Chapter 5: Self heal element", () => {

  it("will pass as the stale element and framework will attempt to self heal", async () => {
    LoginPage.open();
    await LoginPage.stalelogin("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
  });
});
