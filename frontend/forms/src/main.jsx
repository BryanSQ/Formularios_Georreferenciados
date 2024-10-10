import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Header />
    <App />
    <Footer />
  </BrowserRouter>
);
