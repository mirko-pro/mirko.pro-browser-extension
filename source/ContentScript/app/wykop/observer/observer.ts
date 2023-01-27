// import { browser } from 'webextension-polyfill-ts';
import userOptions from '@utils/userOptions';
import { addMirkoProSettingsButton } from '../core/mirkoPro';
import { restoreWatchedLinkInNavbar } from '../core/mainNav';
import { syntaxHighlighting, copyCodeButton } from '../core/codeBlocks';
import {
  expandButtonCounter,
  expandButtonOldBehavior,
} from '../core/entriesButtons';
import { PossibleToObserve } from './types';
import {
  observeClassNames,
  userOptionsRequirements,
  alwaysObserved,
} from './config';

const observer = async () => {
  const options = await userOptions.wykop.getOptions();
  // console.log('options', options);

  const requiredToObserve: PossibleToObserve[] = [];
  Object.keys(userOptionsRequirements).forEach((option: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (options[option]) {
      userOptionsRequirements[option].forEach((item) => {
        if (!requiredToObserve.includes(item)) {
          requiredToObserve.push(item);
        }
      });
    }
  });

  alwaysObserved.forEach((item) => {
    if (!requiredToObserve.includes(item)) {
      requiredToObserve.push(item);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // HITS_SLIDER
          if (requiredToObserve.includes('HITS_SLIDER')) {
            const el = document.querySelector(
              observeClassNames.HITS_SLIDER,
            ) as HTMLElement;
            if (el) {
              el.remove();
            }
          }

          // CODE_BLOCKS
          if (requiredToObserve.includes('CODE_BLOCKS')) {
            document
              .querySelectorAll(
                `${observeClassNames.CODE_BLOCKS}:not([data-mirkopro="true"])`,
              )
              .forEach((el: any) => {
                syntaxHighlighting(el);
                copyCodeButton(el);
                el.dataset.mirkopro = 'true';
              });
          }

          // USERS POST AND COMMENTS
          if (requiredToObserve.includes('ENTRY_MAIN')) {
            document
              .querySelectorAll(
                `${observeClassNames.ENTRY_MAIN}:not([data-mirkopro="true"])`,
              )
              .forEach((el: any) => {
                if (options.showCommentCounterInsideExpandButton) {
                  expandButtonCounter(el);
                }
                if (options.restoreExpandButtonBehavior) {
                  expandButtonOldBehavior(el);
                }
                el.dataset.mirkopro = 'true';
              });
          }

          if (requiredToObserve.includes('ENTRY_BUTTON_MORE')) {
            document
              .querySelectorAll(
                `${observeClassNames.ENTRY_BUTTON_MORE}:not([data-mirkopro="true"])`,
              )
              .forEach((el: any) => {
                el.click();
                el.dataset.mirkopro = 'true';
              });
          }

          if (requiredToObserve.includes('ENTRY_PHOTO')) {
            document
              .querySelectorAll(
                `${observeClassNames.ENTRY_PHOTO}:not([data-mirkopro="true"])`,
              )
              .forEach((el: any) => {
                if (el.querySelector('.animating')) {
                  el.dataset.mirkopro = 'true';
                  return;
                }

                const img = el.querySelector('img');
                if (img) {
                  const putInsideWrapper = () => {
                    console.log('putInsideWrapper');
                    const wrapper = document.createElement('div');
                    wrapper.style.position = 'relative';
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.borderRadius = '10px';
                    wrapper.style.marginTop = '-20px';
                    img.style.position = 'relative';
                    img.style.bottom = '-20px';
                    el.querySelector('figure').prepend(wrapper);
                    wrapper.appendChild(img);
                    el.dataset.mirkopro = 'true';
                  };

                  if (img.complete) {
                    putInsideWrapper();
                    return;
                  }

                  img.addEventListener('load', () => {
                    putInsideWrapper();
                  });
                }
                el.dataset.mirkopro = 'true';
              });
          }

          // HEADER_NAV
          if (requiredToObserve.includes('HEADER_NAV')) {
            const el = document.querySelector(
              `${observeClassNames.HEADER_NAV}:not([data-mirkopro="true"])`,
            ) as HTMLElement;
            if (el) {
              if (options.restoreWatchedLinkInNavbar) {
                restoreWatchedLinkInNavbar(el);
                el.dataset.mirkopro = 'true';
              }
            }
          }

          // MIRKO PRO SETTINGS BUTTON
          if (requiredToObserve.includes('HEADER_ACCOUNT_DROPDOWN_SETTINGS')) {
            const el = document.querySelector(
              `${observeClassNames.HEADER_ACCOUNT_DROPDOWN_SETTINGS}:not([data-mirkopro="true"])`,
            ) as HTMLElement;
            if (el) {
              addMirkoProSettingsButton(el);
              el.dataset.mirkopro = 'true';
            }
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

export default observer;

// mutation.removedNodes.forEach(function(node) {
//   if (node.matches && node.matches('.avatar')) {
//     node.removeEventListener('click', handleClick);
//   }
// });
// mutation.addedNodes.forEach(function(node) {
//   if (node.matches && node.matches('.avatar')) {
//     node.addEventListener('click', handleClick);
//   }
// });
