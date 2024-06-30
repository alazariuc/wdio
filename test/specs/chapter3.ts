import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";

describe("Chapter 3: Cybernetic Enhancements", () => {
  it('should give detailed report and resize browser', async () => {
    await LoginPage.open();
    // Chapter 3
    console.log(`Intrinsic log: Entering password`)
    global.log(`Custom log: Entering password`)
    global.log(``) // Does not print empty string
    global.log(null) // Does not print null value
    global.log(Promise) // Adds trace back when passed an Promise

    await LoginPage.open();

    await LoginPage.login("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(
      expect.stringContaining("You logged into a secure area!"));
  });
});
