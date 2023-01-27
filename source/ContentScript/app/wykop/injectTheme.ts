import { browser } from 'webextension-polyfill-ts';
import userOptions from '@utils/userOptions';

const injectTheme = async () => {
  const options = await userOptions.wykop.getOptions();

  if (!options.themeEnabled) return;

  if (options.themeSource === 'user-defined') {
    if (options.themeUrl) {
      fetchAndInjectTheme(options.themeUrl);
    }
  }

  if (options.themeSource === 'mirko.pro-local') {
    if (options.themeUrl) {
      fetchAndInjectTheme(browser.runtime.getURL(`css/${options.themeUrl}`));
    }
  }

  if (options.themeSource === 'mirko.pro-remote') {
    if (options.themeUrl) {
      fetchAndInjectTheme(options.themeUrl);
    }
  }
};

const fetchAndInjectTheme = async (url: string) => {
  fetch(url).then((response) => {
    response.text().then((text) => {
      const style = document.createElement('style');
      style.dataset.mirkopro = 'true';
      style.innerHTML = text;
      document.head.appendChild(style);
    });
  });
};

export default injectTheme;
