import { useState } from 'react';
import CreatePost from '../Community/CreatePost';
import PostList from '../Community/PostList';
import './Forum.css';

const agriculturalQuotes = [
    "The farmer has to be an optimist or he wouldn’t still be a farmer. – Will Rogers",
    "Agriculture is the most healthful, most useful and most noble employment of man. – George Washington",
    "The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings. – Masanobu Fukuoka",
    "If agriculture goes wrong, nothing else will have a chance to go right in the country. – M. S. Swaminathan",
];

// eslint-disable-next-line react/prop-types
const Forum = ({ onPostCreated }) => {
    const [refresh, setRefresh] = useState(false);
    const randomQuote = agriculturalQuotes[Math.floor(Math.random() * agriculturalQuotes.length)];

    const handleRefresh = () => {
        setRefresh(!refresh);
        if (onPostCreated) {
            onPostCreated();
        }
    };

    return (
        <div className="forum-container">
            <h1 className="forum-title">Community Forum</h1>
            <blockquote className="agriculture-quote">{randomQuote}</blockquote>
            <div className="forum-create-post">
                <CreatePost onPostCreated={handleRefresh} />
            </div>
            <div className="forum-post-list">
                <PostList refresh={refresh} />
            </div>
        </div>
    );
};

export default Forum;
