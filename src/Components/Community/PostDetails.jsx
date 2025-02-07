import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostsFromStorage, savePostsToStorage } from '../../utils/localStorage';
import CommentSection from './CommentSection';
import './PostDetails.css';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const posts = getPostsFromStorage();
        const foundPost = posts.find((p) => p.id === parseInt(postId, 10));
        if (foundPost) {
            setPost(foundPost);
            setEditedTitle(foundPost.title);
            setEditedContent(foundPost.content);
        }
    }, [postId]);

    if (!post) return <p>Post not found or loading...</p>;

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSaveEdit = () => {
        if (editedTitle.trim() && editedContent.trim()) {
            const updatedPost = { ...post, title: editedTitle, content: editedContent };
            setPost(updatedPost);

            const posts = getPostsFromStorage();
            const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));
            savePostsToStorage(updatedPosts);

            setIsEditing(false);
        }
    };

    const handleDeletePost = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const posts = getPostsFromStorage().filter((p) => p.id !== post.id);
            savePostsToStorage(posts);
            navigate('/'); // Redirect to home or posts list after deletion
        }
    };

    return (
        <div className="post-detail">
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            ) : (
                <>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={handleEditToggle}>Edit Post</button>
                    <button onClick={handleDeletePost}>Delete Post</button>
                </>
            )}
            <CommentSection post={post} setPost={setPost} />
        </div>
    );
};

export default PostDetail;
