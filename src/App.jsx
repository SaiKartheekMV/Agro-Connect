import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
//import Footer from './Components/Footer';
import Home from './Components/Home';
import Weather from '../src/pages/Weather/Weather';
import MarketPrices from './Components/MarketPrices/MarketPrices';
import CropSuggestions from './Components/Cropsuggestion/Cropsuggestion';
import Forum from './Components/Community/Forum';  // Main Forum component  // CreatePost component for creating new posts
import PostList from './Components/Community/PostList';       // PostList to show all posts
import PostDetail from './Components/Community/PostDetails';   // PostDetail to show individual post details

function App() {

  // State to trigger re-render when a new post is created
  const [refresh, setRefresh] = useState(false);

  const handlePostCreated = () => {
      setRefresh(!refresh);  // Toggle state to refresh post list
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/market-prices" element={<MarketPrices />} />
          <Route path="/crop-suggestions" element={<CropSuggestions />} />
          
          {/* Community Forum Routes */}
          <Route path="/forum" element={<Forum onPostCreated={handlePostCreated} />} />     {/* Main Forum Page */}
          <Route path="/post-list" element={<PostList />} />  {/* Page to List All Posts */}
          <Route path="/post/:postId" element={<PostDetail />} />  {/* Page to View Post Details and Comments */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
