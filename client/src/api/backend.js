import axios from 'axios';
import { getToken } from '../utilities/localStorage';

const instance = axios.create({
  baseURL: '/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

export const signup = (email, password) =>
  instance.post('/signup', { email, password });

export const login = (email, password) =>
  instance.post('/login', { email, password });

export const getPosts = () => instance.get('/post');

export const getPostById = (postId) => instance.get(`/post/${postId}`);

export const createPost = (content) => instance.post('/post', { content });

export const addComment = (postId, content) =>
  instance.post(`/post/${postId}/comment`, { content });

export const authenticate = () => instance.get('/authenticate');

export const toggleLike = (postId) => instance.post(`/post/${postId}/like`);

export default instance;
