import React, { FunctionComponent, useEffect, useState } from 'react';
import { browser } from 'webextension-polyfill-ts';
import userOptions from '@utils/userOptions';
import {
  // /userOptionsInterface,
  wykopUserOptionGroup,
} from '@utils/userOptions/types';

import { MirkoProLogo } from './svg';

import '../../styles/tailwind.css';
import './styles.scss';

const Options: FunctionComponent = () => {
  const [extensionVersion, setExtensionVersion] = useState<string>('');

  // get userOptions and add it to state. Use right type
  const [userOptionsState, setUserOptionsState]: any = useState();

  useEffect(() => {
    userOptions.wykop.getOptions().then((options: any) => {
      setUserOptionsState(options);
    });
  }, []);

  const changeUserOption = (
    optionName: keyof wykopUserOptionGroup,
    value: any,
  ) => {
    console.log('changeUserOption', optionName, value);

    userOptions.wykop.setOption(optionName, value);

    setUserOptionsState((prevState: any) => ({
      ...prevState,
      [optionName]: value,
    }));
  };

  useEffect(() => {
    const manifestData = browser.runtime.getManifest();
    setExtensionVersion(manifestData.version);
  }, []);

  if (!userOptionsState) return null;

  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-700">
        <div className="px-8 pt-8 w-full max-w-[370px] min-w-[300px] bg-gradient-to-b from-[#212121] to-[#161616] relative">
          <a
            href="https://mirko.pro/"
            target="_blank"
            rel="noreferrer"
            className="transform inline w-[145px] mx-auto mt-8"
          >
            <MirkoProLogo />
          </a>
          <div className="my-6 h-0.5 bg-gradient-to-r from-white to-transparent opacity-30"></div>
          <div className="text-xs opacity-60">
            Twoja wersja: <strong>{extensionVersion}</strong>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button className="flex bg-white bg-opacity-5 border-2 border-white border-opacity-30 text-md font-medium p-4 w-full rounded-lg transition-colors backdrop-blur-sm">
              Wykop
            </button>
            <button className="flex bg-white bg-opacity-[0%] border-2 border-white border-opacity-5 text-gray-100 text-md font-medium p-4 w-full rounded-lg transition-colors backdrop-blur-sm">
              Hejto (niebawem)
            </button>
          </div>

          {/* bg */}
          <div className="absolute w-px h-full top-0 right-0 bg-gradient-to-b from-[#ffffff] to-transparent opacity-5"></div>
          <div className="absolute w-1 h-full top-0 left-0 bg-gradient-to-b from-[#318D50] to-transparent"></div>
        </div>
        <div className="px-6 pt-10 pb-20 container max-w-[980px] mx-auto">
          <div className="flex flex-col justify-center w-full">
            <h2 className="mb-6 text-3xl font-bold">Ustawienia</h2>
            <div className="flex flex-col gap-2">
              {/* Enable custom theme */}
              <OptionGroup
                optionLabel="themeEnabled"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">Motyw DarkClassic</div>
                <div className="description">
                  Motyw kolorystyczny upodobniony do poprzedniej wersji wykopu.
                </div>
              </OptionGroup>

              {/* Remove hits slider */}
              <OptionGroup
                optionLabel="removeHitsSlider"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">Wyłącz slider z hitami</div>
                <div className="description">
                  Wyłącza slider z hitami na samej górze strony głównej.
                </div>
              </OptionGroup>

              {/* Add expand button comments counter */}
              <OptionGroup
                optionLabel="showCommentCounterInsideExpandButton"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">
                  Pokazuj liczbę komentarzy w przycisku rozwijania
                </div>
                <div className="description">
                  Pokazuje liczbę komentarzy wewnątrz przycisku rozwijania
                  wątku.
                </div>
              </OptionGroup>

              {/* Auto click on entry expand button */}
              <OptionGroup
                optionLabel="autoEntryExpand"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">Automatycznie rozwijaj wątki</div>
                <div className="description">
                  Klika przyciski <i>Pokaż całość</i> wewnątrz wątków.
                </div>
              </OptionGroup>

              {/* Cut watermarks on bottom of the images */}
              <OptionGroup
                optionLabel="hideWatermarks"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">Ukrywaj znaki wodne wykopu</div>
                <div className="description">
                  Odcina dolną część miniaturek zdjęć aby ukryć znaki wodne. Nie
                  działa przy gif i video.
                </div>
              </OptionGroup>

              <h5 className="font-bold uppercase tracking-wider text-xs mb-2 mt-8 opacity-50">
                Funkcje z poprzedniego wykopu
              </h5>
              {/* Restore watched link inside manin navbar */}
              <OptionGroup
                optionLabel="restoreWatchedLinkInNavbar"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">
                  Przywróć &quot;Mój Wykop&quot; w górnej belce
                </div>
                <div className="description">
                  Przywraca link który kieruje do twoich obserwowanych tagów i
                  użytkowników.
                </div>
              </OptionGroup>

              {/* Restore expand button behavior */}
              <OptionGroup
                optionLabel="restoreExpandButtonBehavior"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">
                  Przywróć zachowanie przycisku rozwijania
                </div>
                <div className="description">
                  Przywraca funkcję otwierania w nowej karcie dla przycisku
                  rozwijania wątku.
                </div>
              </OptionGroup>

              <h5 className="font-bold uppercase tracking-wider text-xs mb-2 mt-8 opacity-50">
                Pozostałe
              </h5>
              {/* Syntax highlighting */}
              <OptionGroup
                optionLabel="syntaxHighlighting"
                userOptionsState={userOptionsState}
                changeUserOption={changeUserOption}
              >
                <div className="heading">Kolorowanie składni</div>
                <div className="description">
                  Włącza kolorowanie składni kodu. Przydatne na tagu
                  #programowanie.
                  <div className="text-sm opacity-70 mt-2 flex gap-2 items-center">
                    <span className="inline-block">Przykłady</span>
                    <span className="inline-block">:</span>
                    <a
                      href="https://wykop.pl/wpis/54553487/potrzebuje-pomocy-chcialbym-napisac-wrapper-w-reac"
                      target="_blank"
                      rel="noreferrer"
                      className="py-0.5 px-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30"
                    >
                      1
                    </a>
                    <a
                      href="https://wykop.pl/wpis/69890907/public-countdays-startdate-date-enddate-date-numbe"
                      target="_blank"
                      rel="noreferrer"
                      className="py-0.5 -1 px-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30"
                    >
                      2
                    </a>
                    <a
                      href="https://wykop.pl/wpis/70050737/nowywykop-wykop-nowystyl-newstyle-lapcie-nowy-styl"
                      target="_blank"
                      rel="noreferrer"
                      className="py-0.5 -1 px-2 rounded-md bg-white bg-opacity-20 hover:bg-opacity-30"
                    >
                      3
                    </a>
                  </div>
                </div>
              </OptionGroup>
            </div>
          </div>

          {/* dev */}
          {/* <div className="flex gap-10 w-full mt-20 mb-10 bg-white bg-opacity-5 p-5 rounded-xl">
            <button
              onClick={() => console.log(userOptionsState)}
              className="bg-white bg-opacity-20"
            >
              userOptionsState
            </button>
            <button
              onClick={async () => {
                const options = await userOptions.wykop.getOptions();
                console.log(options);
              }}
              className="bg-white bg-opacity-20"
            >
              userOptions.wykop.getOptions
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

const OptionGroup = ({
  children,
  optionLabel,
  userOptionsState,
  changeUserOption,
}: any) => {
  const heading = children.find(
    (child: any) => child.props.className === 'heading',
  );
  const description = children.find(
    (child: any) => child.props.className === 'description',
  );

  return (
    <div className="flex items-center justify-between rounded-lg p-6 border border-white border-opacity-5 bg-white bg-opacity-[3%] w-full hover:bg-opacity-[8%] transition-all">
      <div className="flex flex-col">
        <h4 className="font-bold text-md">{heading}</h4>
        <div className="opacity-50">{description}</div>
      </div>
      <label
        htmlFor={optionLabel}
        className="inline-flex relative items-center cursor-pointer ml-10"
      >
        <input
          type="checkbox"
          value={optionLabel}
          id={optionLabel}
          className="sr-only peer"
          defaultChecked={userOptionsState[optionLabel]}
          onClick={() => {
            changeUserOption(`${optionLabel}`, !userOptionsState[optionLabel]);
          }}
        />
        <div className="w-12 h-7 bg-white bg-opacity-20 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white  after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-opacity-100 peer-checked:bg-green-500"></div>
      </label>
    </div>
  );
};

export default Options;
