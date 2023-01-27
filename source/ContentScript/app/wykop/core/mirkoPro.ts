import { browser } from 'webextension-polyfill-ts';

export const addMirkoProSettingsButton = (el: any) => {
  const dropdownBody = el.closest('.dropdown-body');

  // check if dropdown body already has mirko.pro settings button
  // multiple rerenders fix
  const mirkoProSettings = dropdownBody.querySelector('li.mirko-pro-settings');
  if (mirkoProSettings) return;

  const dropdownSettingsEl = dropdownBody.querySelector('li.settings');
  if (dropdownSettingsEl) {
    const clonedSettingsLi = dropdownSettingsEl.cloneNode(true);
    const clonedSettingsLiElement = clonedSettingsLi as Element;

    if (clonedSettingsLiElement) {
      clonedSettingsLiElement.classList.add('mirko-pro-settings');

      const a = clonedSettingsLiElement.querySelector('a');
      if (a) {
        a.href = '#mirko-pro-settings';
        a.innerHTML = 'mirko.pro';

        // prevent default click event and open extension settings
        a.addEventListener('click', (e) => {
          e.preventDefault();

          // send message to background script
          browser.runtime.sendMessage({
            type: 'openSettings',
          });
        });
      }

      dropdownBody.insertBefore(
        clonedSettingsLiElement,
        dropdownBody.lastChild,
      );
    }
  }
};
