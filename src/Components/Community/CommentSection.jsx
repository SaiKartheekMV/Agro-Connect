import { useState } from 'react';
import PropTypes from 'prop-types';
import { savePostsToStorage } from '../../utils/localStorage';
import './CommentSection.css';

const CommentSection = ({ post, setPost }) => {
    const [comment, setComment] = useState('');

    const handleAddComment = () => {
        if (comment.trim()) {
            const newComment = { id: Date.now(), text: comment };
            const updatedPost = {
                ...post,
                comments: [...post.comments, newComment],
            };
            setPost(updatedPost);
            updatePostsInStorage(updatedPost);
            setComment('');
        }
    };

    const handleDeleteComment = (commentId) => {
        const updatedComments = post.comments.filter((c) => c.id !== commentId);
        const updatedPost = { ...post, comments: updatedComments };
        setPost(updatedPost);
        updatePostsInStorage(updatedPost);
    };

    const updatePostsInStorage = (updatedPost) => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));
        savePostsToStorage(updatedPosts);
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            <ul>
                {post.comments.map((c) => (
                    <li key={c.id}>
                        {c.text}
                        <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

CommentSection.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                text: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
    setPost: PropTypes.func.isRequired,
};

export default CommentSection;
