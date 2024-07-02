import * as helpers from "../../helpers/helpers.js";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername() {
        return $("#username");
    }

    public get staleInputUsername() {
        return $("#user");
    }

    public get inputPassword() {
        return $("#password");
    }

    public get staleInputPassword() {
        return $("#passw");
    }

    public get btnBogus() {
        return $('//button[type="bogus"]');
    }

    public get btnSubmit() {
        return $('button[type="submit"]');
    }

    public get btnLogOn() {
        return $('#login > button > i');
    }


    // Self-healing object: Simulate a submit button that changed class from link anchor to button in last release
    public get staleSubmitLink() {
        return $('//a[text()="submit"]');
    }




    // public async expectBogusToexistAndBeEnabled() {
    //     await helpers.expectAdv(await this.btnBogus, 'does exist');
    //     // Soft Assertion continues after failure
    //     await helpers.expectAdv(await this.btnBogus, 'is enabled');
    // }

    // // Intentional failure - the button text is 'Login'
    // public async expectLogOnButtonText() {
    //     let actualText = await this.btnLogOn.getText();
    //     await helpers.expectAdv(actualText, 'equals', 'Log On');
    // }

    // // Expect the button text is 'Login'
    // public async expectLogInButtonText() {
    //     let actualText = await this.btnLogOn.getText();
    //     await helpers.expectAdv(actualText, 'equals', 'Login');
    // }


    // // Intentiona Error Expect the button text is 'Login'
    // public async expectLogInButtonTextWithEquaTypo() {
    //     let actualText = await this.btnLogOn.getText();
    //     // Intentional Error - the assertion type is 'equa' instead of 'equals'
    //     await helpers.expectAdv(actualText, 'equa', 'Login');
    // }

    /**
     * a method to encapsule advanced automation code to interact with the page
     * e.g. to login using username and password
     */
    public async loginAdv(username: string, password: string) {
        await helpers.log(`Logging in with "${username}" and password"`);
        await this.inputUsername.setValue(username);
        await helpers.log(`Entered '${username}'`);
        await this.inputPassword.setValue(password);
        await helpers.log(
            `Entered password and clicking Submit with ClickAdv`
        );
        await helpers.clickAdv(await this.btnSubmit);
    }

    /**
     * a method to unit test the failure of an 'bogus' button that does not exist
     * e.g. to login using username and password
     */
    public async loginFailLast(username: string, password: string) {
        await helpers.log(`Logging in with '${username}' and '${password}'`);
        await this.inputUsername.setValue(username);
        await helpers.log(`Entered '${username}'`);
        await this.inputPassword.setValue(password);
        await helpers.log(
            `Entered password and clicking Submit button with ClickAdv`
        );
        // Submit button does exist
        await helpers.clickAdv(await this.btnSubmit);
        // Bogus button does not exist!
        await helpers.clickAdv(await this.btnBogus);
    }

    /**
     * a method to unit test the failure of an button that does not exist
     * e.g. to login using username and password
     */
    public async stalelogin(username: string, password: string) {
        await helpers.log(`Logging in with "${username}" and password"`);
        await helpers.setValueAdv(await this.staleInputUsername, username);
        await helpers.log(`Entered "${username}"`);
        await helpers.setValueAdv(await this.staleInputPassword, password);
        await helpers.log(
            `Entered password and clicking Submit with ClickAdv`
        );
        // Submit button that changed class from link anchor to button in last release
        await helpers.clickAdv(await this.staleSubmitLink);
    }

    /**
     * a method to unit test the failure of an button that does not exist
     * e.g. to login using username and password
     */
    // public async loginFailFirst(username: string, password: string) {
    //     await helpers.log(`Logging in with "${username}" and password"`);
    //     await this.inputUsername.setValue(username);
    //     await helpers.log(`Entered "${username}"`);
    //     await this.inputPassword.setValue(password);
    //     await helpers.log(
    //         `Entered password and clicking Submit with ClickAdv`
    //     );
    //     await helpers.clickAdv(await this.btnBogus);
    //     await helpers.clickAdv(await this.btnSubmit);
    // }

    /**
     * a method to unit test the failure of an button that does not exist
     * e.g. to login using username and password
     */
    public async loginFailFirstIfExists(username: string, password: string) {
        await helpers.log(`Logging in with "${username}" and password"`);
        await this.inputUsername.setValue(username);
        await helpers.log(`Entered "${username}"`);
        await this.inputPassword.setValue(password);
        await helpers.log(
            `Entered password and clicking Submit with ClickAdv`
        );
        await helpers.clickAdvIfExists(await this.btnBogus);
        await helpers.clickAdv(await this.btnSubmit);
    }

    /**
     * a method to unit test the failure of an button that does not exist
     * e.g. to login using username and password
     */
    // public async loginSetValue(username: string, password: string) {
    //     await helpers.log(`Logging in with user role "${username}"`);
    //     await helpers.setValueAdv(await this.inputUsername, username);
    //     // Automatcally Mask the Password
    //     await helpers.setValueAdv(await this.inputPassword, password);
    //     await helpers.clickAdv(await this.btnSubmit);
    // }

    /**
     * Chapter 4 a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     * missing await so the click executes before the setValue
     */
    public login_sync(username: string, password: string) {
        global.log(`Logging in with "${username}" and password"`)
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }


    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login(username: string, password: string) {
        // This is the non-framework code generated by the default WebdriverIO template
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    /**
     * Ch:11 Echo location - find element by text alone
     */
    // public async loginWithoutPomSubmit(username: string, password: string) {
    //     // global.log(`Logging in with "${username}" and password"without the Page Object Model`)
    //     await helpers.setValueAdv(`username`, username);
    //     await helpers.setValueAdv(`password`, password);
    //     // Use the type of element to find the element
    //     await helpers.clickAdv(`submit`);
    // }

    // public async loginWithoutPom(username: string, password: string) {
    //     // global.log(`Logging in with "${username}" and password"without the Page Object Model`)
    //     await helpers.setValueAdv(`username`, username);
    //     await helpers.setValueAdv(`password`, password);
    //     // Use the text of the element to find the element
    //     await helpers.clickAdv(`Login`);
    // }



    /**
     * overwrite specific options to adapt it to page object
     */
    public async open(path: string = "login") {
        return await super.open(path);
    }


    /**
     * overwrite specific options to adapt it to page object
     */
    public open_sync(path: string = "login") {
        return super.open_sync(path);
    }




}
export default new LoginPage();
