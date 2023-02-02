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
      const fetchOptions = {
        method: 'GET',
        mode: 'cors',
      };
      fetchAndInjectTheme(options.themeUrl, fetchOptions);
    }
  }
};

const fetchAndInjectTheme = async (url: string, options?: any) => {
  fetch(url, options)
    .then((response) => {
      response.text().then((text) => {
        const style = document.createElement('style');
        style.dataset.mirkopro = 'true';
        style.innerHTML = text;
        document.head.appendChild(style);
      });
    })
    .catch((e) => {
      if (url === 'https://mirko.pro/themes/wykopDarkClassic.css') {
        fetchAndInjectTheme(browser.runtime.getURL(`css/wykopDarkClassic.css`));
      }

      throw new Error(`🛑 Error while fetching theme from ${url} : ${e}`);
    });
};

export default injectTheme;
