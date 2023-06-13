
import Header from './components/layout/Header/Header';
import webFont from 'webfontloader';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

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
    </BrowserRouter>
  );
}

export default App;