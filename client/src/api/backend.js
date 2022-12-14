import axios from 'axios';
import { getToken } from '../utilities/localStorage';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const signup = (name, email, password) =>
  instance.post('/signup', { name, email, password });

export const login = (email, password) =>
  instance.post('/login', { email, password });

export const getPosts = () => instance.get('/post');

export const getAllReportedPosts = () => instance.get(`/post/report`);

export const getPostById = (postId) => instance.get(`/post/${postId}`);

export const getCommentByPostId = (postId) =>
  instance.get(`/post/${postId}/comment`);

export const getPostByUserId = (userId) => instance.get(`/post/user/${userId}`);

export const deletePost = (postId) => instance.delete(`/post/${postId}`);

export const reportPost = (postId) => instance.post(`/post/${postId}/report`);

export const unreportPost = (postId) =>
  instance.post(`/post/${postId}/unreport`);

export const getUserById = (userId) => instance.get(`/user/${userId}`);

export const createPost = (content) => instance.post('/post', { content });

export const addComment = (postId, content) =>
  instance.post(`/post/${postId}/comment`, { content });

export const authenticate = () => instance.get('/authenticate');

export const toggleLike = (postId) => instance.post(`/post/${postId}/like`);

export const searchPost = (word) => instance.post(`/post/search`, { word });

export const searchUser = (name) => instance.post(`/user/search`, { name });

export const getAllUsers = () => instance.get(`/user`);

export const followUser = (userId) => instance.post(`/user/follow`, { userId });

export const uploadImage = (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return instance.post(`/post/image`, formData, {
    headers: {
      'Content-Type': `multipart/form-data;`,
    },
  });
};

export const activateUser = (userId) =>
  instance.patch(`/user/${userId}/activate`);

export const deactivateUser = (userId) =>
  instance.patch(`/user/${userId}/deactivate`);

export const getImage = (imageId) => instance.get(`/post/image/${imageId}`);

export const updatePassword = (password, newPassword) =>
  instance.patch(`/user/password`, { password, newPassword });

export const editProfile = (userName, userBio) =>
  instance.patch(`/user`, { userName, userBio });

export default instance;
