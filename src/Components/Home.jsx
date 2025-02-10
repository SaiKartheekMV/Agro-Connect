import { useState, useEffect, useRef } from 'react';
import img1 from '../assets/image1.jpg';
import img2 from '../assets/image2.jpg';
import img3 from '../assets/image3.webp';
import './Home.css';

const API_KEY = import.meta.env.VITE_NEWS_API;


const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const intervalRef = useRef(null);
  
  const images = [img1, img2, img3];
  const cardsToShow = 4;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=agriculture%20India&language=en&apiKey=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(articles.length - cardsToShow, 0) : prevIndex - cardsToShow
    );
  };

  const nextCard = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex + cardsToShow >= articles.length ? 0 : prevIndex + cardsToShow
    );
  };

  if (loading) return <p>Loading news...</p>;
  if (error) return <p>Error fetching news: {error.message}</p>;

  return (
    <div className="home">
      <div className="slider">
        <img src={images[currentImageIndex]} alt="Farm landscape" />
      </div>
      <div className="overlay">
        <h1>Empowering Sustainable Farming</h1>
        <p>
          Offering tools for weather updates, crop management, and market insights to help farmers thrive.
        </p>
      </div>
      <div className="news-section">
        <h2 className="font-sans text-3xl text-black font-bold">Agricultural News</h2>
        <div className="card-slider">
          <button onClick={prevCard} className="px-4 py-6 mx-6 my-4 w-11 card-button">❮</button>
          <div className="news-cards">
            {articles.slice(currentCardIndex, currentCardIndex + cardsToShow).map((article, index) => (
              <div className="news-card" key={index}>
                {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
                <h4>{article.title}</h4>
                <p className="news-description">
                  {article.description ? article.description.substring(0, 100) + '...' : 'No description available.'}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read more
                </a>
              </div>
            ))}
          </div>
          <button onClick={nextCard} className="px-4 py-6 mx-6 my-4 w-11 card-button">❯</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
