import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Product from './pages/Product'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
    


  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer>
        
      </ToastContainer>

      <Navbar />
      <SearchBar></SearchBar>



      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product></Product>}></Route>
        <Route path='/cart' element= {<Cart></Cart>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/place-order' element={<PlaceOrder></PlaceOrder>}></Route>
        <Route path='/orders' element = {<Orders></Orders>}></Route>



      </Routes>

      <Footer></Footer>

    </div>
  )
}

export default App