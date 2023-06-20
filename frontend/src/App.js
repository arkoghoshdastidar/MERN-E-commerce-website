import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import webFont from 'webfontloader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import { getProducts } from './actions/productActions.js';
import { useDispatch } from 'react-redux';
import ProductDetails from './components/Product/ProductDetails';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    webFont.load({
      google: {
        'families': ['Roboto',]
      }
    });

    dispatch(getProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="view-port">
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/product/:id' element={<ProductDetails />}></Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;