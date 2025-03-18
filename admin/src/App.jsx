import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'

const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
        <Navbar></Navbar>
        <hr></hr>

        <div className='flex w-full'>
          <Sidebar></Sidebar>
          <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add></Add>}></Route>
              <Route path='/list' element={<List></List>}></Route>
              <Route path='/orders' element={<Orders></Orders>}></Route>
            </Routes>

          </div>

        </div>
      </>
      
      

    </div>
  )
}

export default App