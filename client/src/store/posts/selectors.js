import { get } from 'lodash';

export const selectCurrentId = (state) => get(state, `posts.currentId`, null);
export const selectPosts = (state) => get(state, `posts.posts`, []);