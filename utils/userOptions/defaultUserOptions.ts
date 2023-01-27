import { userOptionsInterface } from './types';

const defaultUserOptions: userOptionsInterface = {
  wykop: {
    themeEnabled: true,
    themeSource: 'mirko.pro-local',
    themeUrl: 'wykopDarkClassic.css',
    removeHitsSlider: true,
    syntaxHighlighting: true,
    showCommentCounterInsideExpandButton: true,
    restoreExpandButtonBehavior: true,
    restoreWatchedLinkInNavbar: false,
    autoEntryExpand: false,
    hideWatermarks: false,
  },
  hejto: {
    themeEnabled: true,
    themeSource: 'mirko.pro-local',
    themeUrl: null,
    test: false,
  },
};

export default defaultUserOptions;
