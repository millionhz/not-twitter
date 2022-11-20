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

export const getPostById = (id) => instance.get(`/post/${id}`);

export const createPost = (data) => instance.post('/post', data);

export const addComment = (data) => instance.post('/comment', data)

export default instance;
