import axios from 'axios';


//Axios Instance
const API = axios.create({ baseURL: 'http://localhost:5000' })
//On each request, we add the token
API.interceptors.request.use( (req) => {
    if(localStorage.getItem('profile')){
        const token = JSON.parse(localStorage.getItem('profile'));
        req.headers.Authorization = `Bearer ${token.token}`;
    }
    return req;
})
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`);
export const updatePost = (id, postData) => API.patch(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);