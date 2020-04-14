import React from 'react';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
  }
`;

export default GlobalStyles;
