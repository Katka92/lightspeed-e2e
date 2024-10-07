import { test, expect } from '@playwright/test';
import { UIhelper } from '../utils/UIhelper';
import { Common } from '../utils/Common';
import { Chat } from '../utils/Chat';

test.describe('Check Lightspeed Plugin', () => {
  let uiHelper: UIhelper;
  let common: Common;
  let chat: Chat;

  test.beforeEach(async ({ page }) => {
    uiHelper = new UIhelper(page);
    common = new Common(page);
    chat = new Chat(page);
    await common.loginAsGuest();
  });

  test('Check that Lightspeed bot answers', async ({ page }) => {
    await uiHelper.openSidebar("Lightspeed")
    await chat.chatIsReady();
    await chat.sendMessage('Hello, how are you?');
    await chat.verifyFirstResponseGotten();
  })

  test('Check that Lightspeed in plugins list', async ({ page }) => {
    await uiHelper.openSidebar("Lightspeed")
    await chat.chatIsReady();
    await chat.sendMessage('Hello, how are you?');
    await chat.verifyFirstResponseGotten();
  })
})


