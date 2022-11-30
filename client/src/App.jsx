import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import LoggedInRouter from './routes/LoggedInRoutes';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import CreatePostPage from './pages/CreatePostPage';
import PostPage from './pages/PostPage';
import LoggedOutRoutes from './routes/LoggedOutRoutes';
import SearchPostPage from './pages/SearchPostPage';
import SearchUserPage from './pages/SearchUserPage';
import UserProfilePage from './pages/UserProfilePage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import LogoutRoute from './routes/LogoutRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<LoggedInRouter />}>
          <Route index element={<HomePage />} />
          <Route path="post/compose" element={<CreatePostPage />} />
          <Route path="post/search" element={<SearchPostPage />} />
          <Route path="post/:postId" element={<PostPage />} />
          <Route path="user/search" element={<SearchUserPage />} />
          <Route path="user/:userId" element={<UserProfilePage />} />
          <Route path="updatePassword" element={<UpdatePasswordPage />} />
          <Route path="logout" element={<LogoutRoute />} />
        </Route>
        <Route element={<LoggedOutRoutes />}>
          <Route path="login" element={<LogInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
