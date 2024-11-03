import './App.css';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import Login from "./pages/Login/Login"
import Biographies from './pages/biography/biographieslistingpage';
import Biography from './pages/biography/singlebiographypage';
import Portfolio from './pages/Portfolio/Portfolio';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/home';
import { useState } from 'react';
import TermsandConditions from './pages/TermandConditions/termsandcondition';
import PrivacyPolicy from './pages/TermandConditions/privacypolicy';
import SinglePortfolio from './pages/Portfolio/singlePortfolio';
import SearchResults from './components/SearchBox/SearchResult';
import Review from './pages/Reviews/index';
import About from './pages/about/about';
import TestBiography from './pages/biography/testbiography';
function App() {
  const [selectedBiography, setSelectedBiography] = useState(null);
  return (
    <div>
<Navbar/>
  <ToastContainer/>
  <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/portfolio-hub" element={<Portfolio />} />
  <Route path="/portfolio-hub/Healthcare" element={<Portfolio />} />
  <Route path="/portfolio-hub/Media" element={<Portfolio />} />
  <Route path="/portfolio-hub/Art" element={<Portfolio />} />
  <Route path="/portfolio-hub/Engineering" element={<Portfolio />} />
  <Route path="/portfolio-hub/Business" element={<Portfolio />} />
  <Route path="/portfolio-hub/Journalism" element={<Portfolio />} />
  <Route path="/leaders-journey/Healthcare" element={<Portfolio />} />
  <Route path="/leaders-journey/Media" element={<Portfolio />} />
  <Route path="/leaders-journey/Art" element={<Portfolio />} />
  <Route path="/leaders-journey/All" element={<Portfolio />} />

  <Route path="/leaders-journey/Engineering" element={<Portfolio />} />

  <Route path="/leaders-journey/Business" element={<Portfolio />} />
  <Route path="/leaders-journey/Journalism" element={<Portfolio />} />
  <Route path="/portfolio/:slug" element={<SinglePortfolio />} />
  <Route path="/leaders-journey" element={<Biographies />} />
  <Route path="/leaders-journey/all" element={<Biographies />} />
  <Route path="/leaders-journey/Entrepreneurs" element={<Biographies />} />
  <Route path="/leaders-journey/CEO" element={<Biographies />} />
  <Route path="/leaders-journey/Presidents" element={<Biographies />} />
  <Route path="/leaders-journey/Founders" element={<Biographies />} />
  <Route path="/leaders-journey/Executives" element={<Biographies />} />
  <Route path="/biography/:slug" element={<Biography />} />
  <Route path="/terms-and-conditions" element={<TermsandConditions />} />
  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
  <Route path="/search/:query" element={<SearchResults />} />
  <Route path="/reviews" element={<Review />} />
  <Route path="/about-us" element={<About />} />
  <Route path="/biography/test-biography/:slug" element={<TestBiography />} />
  
  <Route path="*" element={<h1>Not Found</h1>} />
</Routes>
<Footer/>
    </div>
  );
}

export default App;
