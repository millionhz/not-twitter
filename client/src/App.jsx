import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import LogInPage from './features/authentication/LogInPage';
import SignUpPage from './features/authentication/SignUpPage';
import HomePage from './features/home/HomePage';
import ProfilePage from './features/profile/ProfilePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/">
          <Route path="home" element={<HomePage />} />
          <Route path="myprofile" element={<ProfilePage />} />
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
