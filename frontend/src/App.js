import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import webFont from 'webfontloader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        'families': ['Roboto',]
      }
    })
  }, []);

  return (
    <BrowserRouter>
      <Header />
      
      <Footer />
    </BrowserRouter>
  );
}

export default App;