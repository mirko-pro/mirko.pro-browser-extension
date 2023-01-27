export interface sharedUserOptionGroup {
  themeEnabled: boolean;
  themeSource: 'mirko.pro-local' | 'mirko.pro-remote' | 'user-defined';
  themeUrl: string | null;
}

export interface wykopUserOptionGroup extends sharedUserOptionGroup {
  removeHitsSlider: boolean;
  syntaxHighlighting: boolean;
  showCommentCounterInsideExpandButton: boolean;
  restoreExpandButtonBehavior: boolean;
  restoreWatchedLinkInNavbar: boolean;
  autoEntryExpand: boolean;
  hideWatermarks: boolean;
}

export interface hejtoUserOptionGroup extends sharedUserOptionGroup {
  test: boolean;
}

export interface userOptionsInterface {
  wykop: wykopUserOptionGroup;
  hejto: hejtoUserOptionGroup;
}

type userOptionsNamesWykop = keyof wykopUserOptionGroup;
type userOptionsNamesHejto = keyof hejtoUserOptionGroup;

// userOptionsNames is a union type of all user options names
export type userOptionsNames = userOptionsNamesWykop | userOptionsNamesHejto;
