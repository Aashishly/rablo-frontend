import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Header from './components/Header';
import FeaturedProducts from './pages/FeaturedProducts';
import SearchProductByPrice from './pages/SearchProductByPrice';
import SearchProductByRating from './pages/SearchProductByRating';
import SearchByName from './pages/SearchProductByName';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';

const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      { isLoggedIn? <Header /> : "" } 

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/featured" element={<FeaturedProducts />} />
        <Route path="/search" element={<SearchByName />} />
        <Route path="/price" element={<SearchProductByPrice />} />
        <Route path="/rating" element={<SearchProductByRating />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/:id" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
