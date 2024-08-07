import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';

describe("Chapter 4: Super Speed : Time Travel Paradoxes and Broken Promises", () => {
  it('should report text in order 1,2,3 even though the code is in 2, 3, 1 order', () => {
    // Microtasks, Macrotasks and Main thread execute out of order
    Promise.resolve().then(_ => console.log(`2: Promise Microtask - First line of code executes second!`)); //Microtask
    setTimeout(() => console.log(`3: SetTimeout Macrotask - Second line of code executes third!`), 0); // Macrotask
    console.log(`1: Main Thread - Third Line of Code executes first!`); // Main thread
  });
})

describe("Chapter 4: Super Speed : Login with Await", () => {
  it('Should PASS to login because await statements exist to ensure code executes in sequence', async () => {
    await LoginPage.open();
    await LoginPage.login("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(
      expect.stringContaining("You logged into a secure area!"));
  });
})

describe("Ch4: Super Speed : Login fails without await", () => {
  fit('Should FAIL to login because await statements are missing in login_sync and executes out of order', async () => {
    global.log(`1. Open browser without await`);

    // await LoginPage.open(); 
    LoginPage.open(); // FAILS because .click() executes before .setValue() methods

    // Removed all await keywords - Demonstrates potential "Time Travel" issue when .click executes before .setValue in login_sync
    // await LoginPage.login("tomsmith", "SuperSecretPassword!");
    LoginPage.login_sync('tomsmith1', 'SuperSecretPassword!');  // FAILS here because without await keywords the .click()  
    //     method executes before .setValue() statements 

    //await expect(SecurePage.flashAlert).toBeExisting();
    expect(SecurePage.flashAlert).toBeExisting();

    // Note: Missing an await here will fail because the LoginPage.login() method has not 
    //         yet navigated to the Secure Page.
    // expect(SecurePage.flashAlert).toHaveText(expect.stringContaining("You logged into a secure area!"));
    // an await here is required to ensure the navigation and login code above 
    //      executes before the code below

    await expect(SecurePage.flashAlert).toHaveText(
      expect.stringContaining("You logged into a secure area!"));

  })  // FAILS because .click() executes before both .setValue() methods 
  //  generating "Your username is invalid!" error
})
