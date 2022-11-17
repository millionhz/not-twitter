import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
});

export const signup = (email, password) =>
  instance.post('/signup', { email, password });

export const getPosts = () => instance.get('/post');

export const getPostById = (id) => instance.get(`/post/${id}`);

export const createPost = (data) => instance.post('/post', data);

export default instance;
