import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import AuthRouter from './routers/AuthRouter';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';

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
          <Route path="post/compose" element={<CreatePostPage />} />
          <Route path="post/:postId" element={<PostPage />} />
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
