import React from 'react';
import Terser from 'terser';

import {
  PREFERS_DARK_KEY,
  COLORS,
  PREFERS_DARK_CSS_PROP,
} from './src/constants';

import App from './src/components/App';

function setColorsByTheme() {
  const colors = '🌈';
  const prefersDarkKey = '🔑';
  const prefersDarkCssProp = '⚡️';

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const prefersDarkFromMQ = mql.matches;
  const prefersDarkFromLocalStorage = localStorage.getItem(prefersDarkKey);

  let isDark;

  const hasUsedToggle = typeof prefersDarkFromLocalStorage === 'string';

  if (hasUsedToggle) {
    isDark = prefersDarkFromLocalStorage === 'true';
  } else {
    isDark = prefersDarkFromMQ;
  }

  let root = document.documentElement;

  root.style.setProperty(prefersDarkCssProp, isDark);

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`;

    root.style.setProperty(
      cssVarName,
      isDark ? colorByTheme.dark : colorByTheme.light
    );
  });
}

const ThemeHydrationScriptTag = () => {
  const boundFn = String(setColorsByTheme)
    .replace("'🌈'", JSON.stringify(COLORS))
    .replace('🔑', PREFERS_DARK_KEY)
    .replace('⚡️', PREFERS_DARK_CSS_PROP);

  const calledFunction = `(${boundFn})()`;
  // injectedScriptContents = Terser.minify(injectedScriptContents).code;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
};

export const onRenderBody = ({
  setHeadComponents,
  pathname,
  setPreBodyComponents,
}) => {
  setPreBodyComponents(<ThemeHydrationScriptTag />);
};

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>;
};
