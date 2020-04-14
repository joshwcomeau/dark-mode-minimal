import React from 'react';

import { ThemeProvider } from './ThemeContext';
import GlobalStyles from './GlobalStyles';

function App({ children }) {
  return (
    <ThemeProvider>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}

export default App;
