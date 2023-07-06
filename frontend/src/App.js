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
import Products from './components/Product/Products';
import Search from './components/Search/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { loadUser } from './actions/userActions';
import Profile from './components/User/Profile';
import EditProfile from './components/User/EditProfile';
import UpdatePassword from './components/User/UpdatePassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';

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
    
    dispatch(loadUser());
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
            <Route path='/login' element={<LoginSignup />}></Route>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/me/update' element={<EditProfile />}></Route>
            <Route path='/password/update' element={<UpdatePassword />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/shipping' element={<Shipping />}></Route>
            <Route path='/order/confirm' element={<ConfirmOrder />}></Route>
            <Route path='/process/checkout' element={<Payment />}></Route>
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;