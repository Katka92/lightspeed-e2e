import { UIhelper } from './UIhelper';
import { Browser, expect, Page, TestInfo, test as base, LaunchOptions, Logger, ConsoleMessage } from '@playwright/test';
import { chat } from '../support/pageObjects/lightspeed-po';
import path from 'path';
type LogSeverity = 'verbose' | 'info' | 'warning' | 'error';

export class Chat {
    page: Page;
    uiHelper: UIhelper;

    constructor(page: Page) {
        this.page = page;
        this.uiHelper = new UIhelper(page);
    }

    async chatIsReady() {
        this.page.locator(chat.input).waitFor({ state: 'visible' });
        this.page.getByText(chat.headerText).waitFor({ state: 'visible' });
    }

    async selectModel(model: string) {
        const dropdown = this.page.locator(chat.modelsDropdown)
        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();
        await this.page.getByText(model).click();
        expect(dropdown).toHaveText(model)
    }

    async sendMessage(message: string) {
        const inputLocator = this.page.getByPlaceholder(chat.inputPlaceholder);
        await inputLocator.waitFor({ state: 'visible' });
        await inputLocator.fill(message);
        await this.page.locator(chat.sendButton).click();
    }


    async verifyMessageCount(count: number, timeout: number = 5000) {
        console.log("Verifying message count to be ", count)
        await expect(this.page.locator(chat.messageClass)).toHaveCount(count, { timeout: timeout })
    }

    async verifyLastMessageFromBot(timeout?: number) {
        this.verifyLastMessageOwner(chat.chatbotMessageClass)
    }

    async verifyLastMessageFromUser(timeout?: number) {
        this.verifyLastMessageOwner(chat.userMessageClass)
    }

    private async verifyLastMessageOwner(ownerClass: string) {
        const messages = this.page.locator(chat.messageClass)
        let last = await messages.count() - 1;
        let lastMessageClass = await messages.nth(last).getAttribute('class');
        expect(lastMessageClass).toContain(ownerClass);
    }
}