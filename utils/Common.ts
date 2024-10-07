import { UIhelper } from './UIhelper';
import { test, Browser, expect, Page, TestInfo } from '@playwright/test';
import { waitsObjs } from '../support/pageObjects/global-obj';
import path from 'path';

export class Common {
    page: Page;
    uiHelper: UIhelper;

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIhelper(page);
    }

    async loginAsGuest() {
        await this.page.goto('/');
        await this.waitForLoad(240000);
        // TODO - Remove it after https://issues.redhat.com/browse/RHIDP-2043. A Dynamic plugin for Guest Authentication Provider needs to be created
        this.page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });

        await this.uiHelper.verifyHeading('Select a sign-in method');
        await this.uiHelper.clickButton('Enter');
        await this.uiHelper.waitForSideBarVisible();
    }

    async waitForLoad(timeout = 120000) {
        for (const item of Object.values(waitsObjs)) {
            await this.page.waitForSelector(item, {
                state: 'hidden',
                timeout: timeout,
            });
        }
    }
}

export async function setupBrowser(browser: Browser, testInfo: TestInfo) {
    const context = await browser.newContext({
        recordVideo: {
            dir: `test-results/${path
                .parse(testInfo.file)
                .name.replace('.spec', '')}`,
            size: { width: 1920, height: 1080 },
        },
    });
    const page = await context.newPage();
    return { page, context };
}