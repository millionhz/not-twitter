import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './features/home/HomePage';
import ProfilePage from './features/profile/ProfilePage';
import PageNotFound from './features/not-found/PageNotFound';
import CreatePostPage from './features/post/CreatePostPage';
import NewComment from './features/comments/NewComment';
import AuthRouter from './routers/AuthRouter';

const toLogin = <Navigate to="/login" />;
const toHome = <Navigate to="/" />;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={<AuthRouter onValid={<Outlet />} onInvalid={toLogin} />}
        >
          <Route index element={<HomePage />} />
        </Route>
        <Route
          path="/"
          element={<AuthRouter onValid={toHome} onInvalid={<Outlet />} />}
        >
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
