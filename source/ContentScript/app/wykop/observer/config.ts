import {
  ObserveClassNames,
  UserOptionsRequirements,
  PossibleToObserve,
} from './types';

export const observeClassNames: ObserveClassNames = {
  HITS_SLIDER: '.hits-slider',
  CODE_BLOCKS: 'code.block',
  ENTRY_ALL: '.content .entry',
  ENTRY_MAIN: '.content .entry:not(.reply)',
  ENTRY_REPLY: '.content .entry.reply',
  ENTRY_BUTTON_MORE: '.content .entry .wrapper button.more',
  ENTRY_PHOTO: '.content .entry .entry-photo',
  HEADER: 'header.header',
  HEADER_NAV: 'header.header nav.main',
  HEADER_ACCOUNT_DROPDOWN: 'header .right .dropdown.account',
  HEADER_ACCOUNT_DROPDOWN_SETTINGS: 'header .right .dropdown.account .settings',
};

export const userOptionsRequirements: UserOptionsRequirements = {
  removeHitsSlider: ['HITS_SLIDER'],
  syntaxHighlighting: ['CODE_BLOCKS'],
  showCommentCounterInsideExpandButton: ['ENTRY_MAIN'],
  restoreExpandButtonBehavior: ['ENTRY_MAIN'],
  restoreWatchedLinkInNavbar: ['HEADER_NAV'],
  autoEntryExpand: ['ENTRY_BUTTON_MORE'],
  hideWatermarks: ['ENTRY_PHOTO'],
};

export const alwaysObserved: PossibleToObserve[] = [
  'HEADER_ACCOUNT_DROPDOWN_SETTINGS',
];
