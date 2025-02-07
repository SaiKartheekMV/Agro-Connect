import { Link } from 'react-router-dom';
import { getPostsFromStorage } from '../../utils/localStorage';
import './PostList.css';

const PostList = () => {
    const posts = getPostsFromStorage();

    return (
        <div className="post-list">
            <h2>Community Forum Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
