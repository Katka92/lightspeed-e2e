import { test, expect } from '@playwright/test';
import { UIhelper } from '../utils/UIhelper';
import { Common } from '../utils/Common';
import { Chat } from '../utils/Chat';

test.describe('Check Lightspeed Plugin', () => {
  const model = 'mistral:latest'
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
    test.setTimeout(600_000);
    await uiHelper.openSidebar("Lightspeed")
    await chat.chatIsReady();
    await chat.sendMessage('Hello, how are you?');
    await chat.verifyMessageCount(2);
    await chat.verifyLastMessageFromBot();

    console.log("change model")
    await chat.selectModel(model)
    console.log("send second message")
    await chat.sendMessage('What do you know about OpenShift?');

    console.log(new Date())
    await chat.verifyMessageCount(4, 60_000);
    console.log(new Date())
    await chat.verifyLastMessageFromBot();
  })

})


