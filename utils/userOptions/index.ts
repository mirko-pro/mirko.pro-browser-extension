import { browser } from 'webextension-polyfill-ts';
import {
  wykopUserOptionGroup,
  // hejtoUserOptionGroup,
  userOptionsInterface,
} from './types';
import defaultUserOptions from './defaultUserOptions';

export const getUserOptions = async (group: keyof userOptionsInterface) => {
  const userOptions = await browser.storage.sync.get(`userOptions-${group}`);
  if (!userOptions[`userOptions-${group}`]) {
    await browser.storage.sync.set({
      [`userOptions-${group}`]: defaultUserOptions[group],
    });
    return defaultUserOptions[group];
  }
  return userOptions[`userOptions-${group}`];
};

export const getUserOption = async (
  group: keyof userOptionsInterface,
  // option: keyof userOptionsInterface[keyof userOptionsInterface],
  option: any,
) => {
  const userOptions = await getUserOptions(group);
  return userOptions[option];
};

export const setUserOptions = async (
  group: keyof userOptionsInterface,
  options: userOptionsInterface[keyof userOptionsInterface],
) => {
  await browser.storage.sync.set({
    [`userOptions-${group}`]: options,
  });
};

export const setUserOption = async (
  group: keyof userOptionsInterface,
  // option: keyof userOptionsInterface[keyof userOptionsInterface],
  option: any,
  value: userOptionsInterface[keyof userOptionsInterface][keyof userOptionsInterface[keyof userOptionsInterface]],
  // value: any
) => {
  console.log('setUserOption', group, option, value);

  const userOptions = await getUserOptions(group);
  userOptions[option] = value;
  await setUserOptions(group, userOptions);
};

export const checkUserOptions = async () => {
  const groups = Object.keys(defaultUserOptions) as Array<
    keyof userOptionsInterface
  >;

  groups.forEach(async (group) => {
    const userOptions = await getUserOptions(group);
    const defaultOptions: any = defaultUserOptions[group];

    // check if userOptions are set
    if (!userOptions) {
      await setUserOptions(group, defaultOptions);
    }

    // check if userOptions keys are correct
    const userOptionsKeys = Object.keys(userOptions);
    const defaultOptionsKeys = Object.keys(defaultOptions);

    userOptionsKeys.forEach((key) => {
      if (!defaultOptionsKeys.includes(key)) {
        delete userOptions[key];
      }
    });

    defaultOptionsKeys.forEach((key) => {
      if (!userOptionsKeys.includes(key)) {
        userOptions[key] = defaultOptions[key];
      }
    });

    console.log(`⚙️ userOptions-${group} checked`, userOptions);

    await setUserOptions(group, userOptions);
  });
};

const userOptions = {
  wykop: {
    getOptions: async () => {
      return (await getUserOptions('wykop')) as wykopUserOptionGroup;
    },
    getOption: async (option: keyof wykopUserOptionGroup) => {
      return await getUserOption('wykop', option);
    },
    setOptions: async (options: wykopUserOptionGroup) => {
      return await setUserOptions('wykop', options);
    },
    setOption: async (option: keyof wykopUserOptionGroup, value: any) => {
      return await setUserOption('wykop', option, value);
    },
  },
};

// const userOptions: any = {};

// const generateMethods = (group: keyof userOptionsInterface) => {
//   userOptions[group] = {
//     getOptions: async () => {
//       return await getUserOptions(group);
//     },
//     getOption: async (
//       option: keyof userOptionsInterface[keyof userOptionsInterface],
//     ) => {
//       return await getUserOption(group, option);
//     },
//     setOptions: async (
//       options: userOptionsInterface[keyof userOptionsInterface],
//     ) => {
//       return await setUserOptions(group, options);
//     },
//     setOption: async (
//       option: keyof userOptionsInterface[keyof userOptionsInterface],
//       value: userOptionsInterface[keyof userOptionsInterface][keyof userOptionsInterface[keyof userOptionsInterface]],
//     ) => {
//       return await setUserOption(group, option, value);
//     },
//   };
// };

// Object.keys(defaultUserOptions).forEach((group) => {
//   generateMethods(group as keyof userOptionsInterface);
// });

export default userOptions;
