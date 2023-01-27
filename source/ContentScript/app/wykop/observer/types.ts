export type PossibleToObserve =
  | 'HITS_SLIDER'
  | 'CODE_BLOCKS'
  | 'ENTRY_ALL'
  | 'ENTRY_MAIN'
  | 'ENTRY_REPLY'
  | 'ENTRY_BUTTON_MORE'
  | 'ENTRY_PHOTO'
  | 'HEADER'
  | 'HEADER_NAV'
  | 'HEADER_ACCOUNT_DROPDOWN'
  | 'HEADER_ACCOUNT_DROPDOWN_SETTINGS';

export interface ObserveClassNames {
  [key: string]: string;
}

export interface UserOptionsRequirements {
  [key: string]: PossibleToObserve[];
}
