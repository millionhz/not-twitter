import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import LogInPage from './features/authentication/LogInPage';
import SignUpPage from './features/authentication/SignUpPage';
import HomePage from './features/home/HomePage';
import ProfilePage from './features/profile/ProfilePage';
import ProtectedRoutes from './features/authentication/ProtectedRoutes';
import PageNotFound from './features/not-found/PageNotFound';
import CreatePostPage from './features/post/CreatePostPage';
import NewComment from './features/comments/NewComment';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/">
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<HomePage />} />
            <Route path="home/createpost" element={<CreatePostPage />} />
            <Route path="myprofile" element={<ProfilePage />} />
            <Route path="home/newcomment" element={<NewComment />} />
          </Route>
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
