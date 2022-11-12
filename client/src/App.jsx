import React from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import LoginPage from './features/authentication/LoginPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />;
    </ThemeProvider>
  );
}

export default App;
