import './App.css';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import webFont from 'webfontloader';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import { getProducts } from './actions/productActions.js';
import { useDispatch } from 'react-redux';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Search/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6119e6',
    }
  },
});

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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="view-port">
          <Header />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product/:id' element={<ProductDetails />}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/products/:keyword' element={<Products />}></Route>
            <Route path='/search' element={<Search />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;