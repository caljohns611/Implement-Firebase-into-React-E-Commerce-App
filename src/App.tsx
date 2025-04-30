import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import ProductManager from './components/ProductManager';

export default function App() {
  return (
    <div style={{ padding: '16px' }}>
      <Register />
      <Login />
      <Profile />
      <ProductManager />
    </div>
  );
};