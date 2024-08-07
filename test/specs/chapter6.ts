import LoginPage from "../pageobjects/login.page.js";
import KeyPressesPage from "../pageobjects/inputs.page.js";
import * as helpers from "../../helpers/helpers.js";

describe("The setValue Wrapper – Entering Text and Dynamic Data Replacement", () => {
  it("Chapter 6: setValue Wrapper", async () => {
    global.log(helpers.getToday()); // returns current date in dd-mm-yyyy format
    global.log(helpers.getToday(5, "dd-mm-yyyy")); // returns current date plus 5 days in dd/mm/yyyy format
    global.log(helpers.getToday(-3, "dd-mm-yyyy")); // returns current date minus 3 days in dd/mm/yyyy format
    await LoginPage.open("key_presses");
    await KeyPressesPage.enterDateTags();
  });
});
