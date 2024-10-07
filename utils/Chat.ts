import { UIhelper } from './UIhelper';
import { test, Browser, expect, Page, TestInfo } from '@playwright/test';
import { chat } from '../support/pageObjects/lightspeed-po';
import path from 'path';

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

    async sendMessage(message: string) {
        const inputLocator = this.page.getByPlaceholder(chat.inputPlaceholder);
        await inputLocator.waitFor({ state: 'visible' });
        await inputLocator.fill(message);
        await this.page.locator(chat.sendButton).click();
    }

    async verifyFirstResponseGotten() {
        const chatbotMessage = this.page.locator(chat.chatbotMessageClass);
        await chatbotMessage.waitFor({ state: 'visible' });
        expect(chatbotMessage).toHaveText;
    }
}