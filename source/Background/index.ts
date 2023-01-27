// import 'emoji-log';
import { browser } from 'webextension-polyfill-ts';
import { checkUserOptions } from '@utils/userOptions';

browser.runtime.onInstalled.addListener((): void => {
  console.log('extension installed');

  // check userOptions
  checkUserOptions();
});

// add message listener
browser.runtime.onMessage.addListener((message) => {
  console.log(message);

  // if message type is openSettings
  if (message.type === 'openSettings') {
    // open extension settings
    browser.runtime.openOptionsPage();
  }
});
