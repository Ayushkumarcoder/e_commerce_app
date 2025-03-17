import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div >
                <img src={assets.logo} className='mb-5 w-32' alt=''></img>
                <p className='w-full  md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, in. Perspiciatis unde, esse quidem sunt necessitatibus velit quos odit, similique aspernatur debitis optio dignissimos cupiditate ut eligendi. Dignissimos, cupiditate nam.</p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li >Home</li>
                    <li >About Us</li>
                    <li >Delivery</li>
                    <li >Privacy Policy</li>

                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>Get in Touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91-982377747</li>
                    <li>contact@gmail.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr></hr>
            <p className='py-5 text-sm text-center'>Copyright 2025@ forever.com - ALL RIGHTS RESERVED</p>
            
        </div>
    </div>
  )
}

export default Footer