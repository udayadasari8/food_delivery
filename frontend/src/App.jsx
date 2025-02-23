import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import RestaurantDetail from './pages/RestaurantDetail';

function App() {

  return (
    <BrowserRouter>
      <div>
        {/* <Navbar /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/restaurants" element={<Restaurants />} /> */}
          <Route path="/restaurants/:id" element={<RestaurantDetail />} />
          <Route path="/reviews/:restaurantId/:dishId" element={<Reviews />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/track/:orderId" element={<Tracking/>} />
          {/* <Route path="*" element={<Navigate to="/" replace />} />  */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
