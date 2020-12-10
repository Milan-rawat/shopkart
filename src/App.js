import React from 'react';
import './App.css';
import Home from './Components/Screens/Home/Home';
import SignUp from './Components/Screens/Authentication/SignUp';
import SignIn from './Components/Screens/Authentication/SignIn';
import SignOut from './Components/Screens/Authentication/SignOut';
import ProductSell from './Components/Screens/ProductSell/ProductSell';
import AddProduct from './Components/Screens/AddProduct/AddProduct';
import MyProductDetail from './Components/Screens/MyProductDetail/MyProductDetail';
import SearchResult from './Components/Screens/SearchResult/SearchResult';
import ProductDetails from './Components/Screens/ProductDetails/ProductDetails'
import { BrowserRouter, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact = {true} component = {Home} />
        <Route path="/user/signup" component = {SignUp} />
        <Route path="/user/signin" component = {SignIn} />
        <Route path="/user/signout" component = {SignOut} />
        <Route path="/user/sell" component = {ProductSell} />
        <Route path="/user/addprd" component = {AddProduct} />
        <Route path="/user/myprd/:id" component = {MyProductDetail} />
        <Route path="/user/searched/:id" component = {SearchResult} />
        <Route path="/user/prddetails/:id" component = {ProductDetails} />
      </BrowserRouter>
    </>
  );
}

export default App;
