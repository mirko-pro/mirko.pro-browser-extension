// import 'emoji-log';
import { browser } from 'webextension-polyfill-ts';
import { checkUserOptions } from '@utils/userOptions';

browser.runtime.onInstalled.addListener((): void => {
  console.log('Hello');
  checkUserOptions();
});

// add message listener
browser.runtime.onMessage.addListener((message) => {
  console.log(message);

  if (message.type === 'openSettings') {
    browser.runtime.openOptionsPage();
  }
});
