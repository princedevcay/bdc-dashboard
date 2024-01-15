import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ColorModeScript } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductProvider from './contexts/ProductContext';
import ActivityProvider from './contexts/ActivityContext';
import BDCCompaniesProvider from './contexts/BDCCompaniesContext';
import DepotsProvider from './contexts/DepotsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="light" />
    <ProductProvider>
      <ActivityProvider>
        <BDCCompaniesProvider>
          <DepotsProvider>
            <App />
          </DepotsProvider>
        </BDCCompaniesProvider>
      </ActivityProvider>
    </ProductProvider>
  </React.StrictMode>,
);
