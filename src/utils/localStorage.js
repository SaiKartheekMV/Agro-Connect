// src/utils/localStorage.js
export const getPostsFromStorage = () => {
    const posts = localStorage.getItem('posts');
    return posts ? JSON.parse(posts) : [];
};

export const savePostsToStorage = (posts) => {
    localStorage.setItem('posts', JSON.stringify(posts));
};
