import React from 'react';

import { COLORS, PREFERS_DARK_KEY, PREFERS_DARK_CSS_PROP } from '../constants';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Because colors matter so much for the initial page view, we're
    // doing a lot of the work in gatsby-ssr. That way it can happen before
    // the React component tree mounts.
    const initialColorValue =
      root.style.getPropertyValue(PREFERS_DARK_CSS_PROP) === 'true'
        ? 'dark'
        : 'light';

    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement;

      const isDark = newValue === 'dark';
      root.style.setProperty(PREFERS_DARK_CSS_PROP, isDark);

      localStorage.setItem(PREFERS_DARK_KEY, isDark);

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;

        root.style.setProperty(
          cssVarName,
          isDark ? colorByTheme.dark : colorByTheme.light
        );
      });

      rawSetColorMode(newValue);
    }

    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
