import allureReporter from '@wdio/allure-reporter';
import { config } from '../../wdio.shared.conf.js';
import * as helpers from '../../helpers/helpers.js';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
    public get btnHalloweenParty() {
        return $(`//a[text()='Halloween Party']`);
    }

    /**
     * Opens a sub page of the page or the url provided
     * @param path optional path of the sub page (e.g. /path/to/page.html)
     */
    public async open(path: string) {
        allureReporter.addAttachment('Navigating to url', path, 'string');

        if (path.startsWith('http')) {
            await browser.url(path); // Overwrite the path
        } else if (path.startsWith('components')) {
            await browser.url(`https://www.telerik.com/kendo-react-ui/${path}`);
        } else if (path === '') { //uses baseUrl from wdio.shared.conf.ts
            await browser.url(`${browser.options.baseUrl}`);
        } else {
            return await browser.url(`${config.baseUrl}/${path}`);
        }
        
        // Wait for the landing page to load
        await helpers.pageSync();

        let message: string = '';
        if (path.startsWith(`components`)) {
            message = `Opening URL: https://www.telerik.com/kendo-react-ui/${path}`;
        }
        else {
            message = `Opening URL: ${config.baseUrl}/${path}`;
        }
        const line = '-'.repeat(message.length);
        
        global.log(line);
        global.log(message);
        global.log(line);
    }



    /**
     * Opens a sub page of the page or the url provided
     * @param path optional path of the sub page (e.g. /path/to/page.html)
     */
    public async open_sync(path: string) {
        allureReporter.addAttachment('Navigating to url', path, 'string');

        if (path.startsWith(`http`)) {
            browser.url(path); // Overwrite the path
        } else if (path.startsWith(`components`)) {
            browser.url(`https://www.telerik.com/kendo-react-ui/${path}`);
        } else if (path === ``) { //uses baseUrl from wdio.shared.conf.ts
            browser.url(`${browser.options.baseUrl}`);
        } else {
            return browser.url(`${config.baseUrl}/${path}`);
        }
        
        // Wait for the landing page to load
        //helpers.pageSync();

        let message: string = '';
        if (path.startsWith(`components`)) {
            message = `Opening URL: https://www.telerik.com/kendo-react-ui/${path}`;
        }
        else {
            message = `Opening URL: ${config.baseUrl}/${path}`;
        }
        // const line = '-'.repeat(message.length);
        
        // global.log(line);
        // global.log(message);
        // global.log(line);
    }

}
