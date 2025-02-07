import { useState } from 'react';
import PropTypes from 'prop-types';
import { getPostsFromStorage, savePostsToStorage } from '../../utils/localStorage';
import './CreatePost.css';

const CreatePost = ({ onPostCreated, postToEdit }) => {
    const [title, setTitle] = useState(postToEdit ? postToEdit.title : '');
    const [content, setContent] = useState(postToEdit ? postToEdit.content : '');

    const handleCreateOrEditPost = () => {
        if (title.trim() && content.trim()) {
            const newPost = {
                id: postToEdit ? postToEdit.id : Date.now(),
                title,
                content,
                comments: postToEdit ? postToEdit.comments : [],
            };
            const posts = getPostsFromStorage();
            if (postToEdit) {
                const updatedPosts = posts.map((p) => (p.id === postToEdit.id ? newPost : p));
                savePostsToStorage(updatedPosts);
            } else {
                posts.push(newPost);
                savePostsToStorage(posts);
            }
            onPostCreated();
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="create-post">
            <h2>{postToEdit ? 'Edit Post' : 'Create a New Post'}</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button onClick={handleCreateOrEditPost}>
                {postToEdit ? 'Update Post' : 'Create Post'}
            </button>
        </div>
    );
};

CreatePost.propTypes = {
    onPostCreated: PropTypes.func.isRequired,
    postToEdit: PropTypes.object,
};

export default CreatePost;
