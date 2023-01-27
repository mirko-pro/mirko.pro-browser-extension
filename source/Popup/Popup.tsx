import React, { FunctionComponent, useEffect, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';

import { MirkoProLogo } from './svg';

import './styles.scss';

const Popup: FunctionComponent = () => {
  // React.useEffect(() => {
  //   // reload extension on popup open
  //   browser.runtime.reload();
  // }, []);

  const [extensionVersion, setExtensionVersion] = useState<string>('');

  useEffect(() => {
    const manifestData = browser.runtime.getManifest();
    setExtensionVersion(manifestData.version);
  }, []);

  return (
    <div className="p-6 w-full min-h-[350px] bg-gradient-to-b from-[#161616] to-[#212121] relative">
      {/* content */}
      <div className="min-h-[350px] flex flex-col justify-between align-center relative z-10">
        <div className="text-center flex flex-col gap-2">
          <a
            href="https://mirko.pro/"
            target="_blank"
            rel="noreferrer"
            className="transform inline w-[145px] mx-auto mt-8"
          >
            <MirkoProLogo />
          </a>

          <div className="info text-xs mt-2 opacity-60">
            Twoja wersja: <strong>{extensionVersion}</strong>
          </div>
        </div>

        <div className="w-full max-w-[260px] flex gap-2 flex-col mx-auto">
          <button
            className="flex justify-center bg-green-500 hover:bg-green-400 text-md font-bold py-3 w-full rounded-lg transition-colors backdrop-blur-sm"
            onClick={() => {
              browser.runtime.openOptionsPage();
            }}
          >
            Ustawienia
          </button>
          <button
            className="mt-2 flex justify-center bg-white bg-opacity-5 border-2 border-white border-opacity-5 hover:bg-opacity-20 hover:border-opacity-20 font-medium py-2 w-full rounded-lg transition-colors backdrop-blur-md text-sm"
            onClick={() => {
              browser.tabs.create({
                url: 'https://wykop.pl/tag/mirkopro',
              });
            }}
          >
            Tag #mirkopro
          </button>
          <button
            className="flex justify-center bg-white bg-opacity-5 border-2 border-white border-opacity-5 hover:bg-opacity-20 hover:border-opacity-20 font-medium py-2 w-full rounded-lg transition-colors backdrop-blur-md text-sm"
            onClick={() => {
              browser.tabs.create({
                url: 'https://buycoffee.to/mirko.pro',
              });
            }}
          >
            Postaw kawę
          </button>
        </div>

        <footer className="text-xs text-gray-100 text-center">
          <button
            onClick={() => {
              // reload extension
              browser.runtime.reload();
            }}
          >
            Zrestartuj wtyczkę
          </button>
        </footer>
      </div>

      {/* background */}
      <div className="absolute top-0 right-0 w-full h-full flex justify-around opacity-10">
        {[...Array(8)].map((_, index) => {
          return (
            <div
              key={index}
              className="w-px h-full bg-gradient-to-b from-transparent to-[#606060]"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popup;
