import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { PgFOF } from './components/PgFOF';
import { Signup } from './components/Signup';
import { Cart } from './components/Cart';
import {UserProfile}  from './components/UserProfile'
import { AddProduct } from './components/AddProduct';
import { AllProductPage } from './components/some-product-components/AllProductPage';
import { SpecificProductPage } from './components/some-product-components/SpecificProductPage';
import Checkout from './components/some-product-components/Checkout';
import { Confirmation } from './components/some-product-components/Confirmation';
import { MyOrder } from './components/some-product-components/MyOrder';

function App() {
  return (
   <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/cart" element={<Cart/>} />
          <Route exact path="/userprofile" element={<UserProfile/>} />
          <Route exact path="/sellproduct" element={<AddProduct/>} />
          <Route exact path="/product-type/mobiles" element={<AllProductPage type={'Mobile'} />} />
          <Route exact path="/product-type/laptops" element={<AllProductPage type={'Laptop'} />} />
          <Route exact path="/product-type/cameras" element={<AllProductPage type={'Camera'} />} />
          <Route exact path="/product-type/watches" element={<AllProductPage type={'Watch'} />} />
          <Route path="/product/:type/:id" element={<SpecificProductPage/>} />
          <Route exact path='/cartdata' element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout/>} />
          <Route exact path="/confirmation" element={<Confirmation/>} />
          <Route exact path="/myorder" element={<MyOrder/>} />

                

          <Route path="*" element={<PgFOF/>}/> 
      </Routes>
   </BrowserRouter> 
  );
}

export default App;
