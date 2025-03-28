import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}></Title>

      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img}></img>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'> 43 , Laxmi Nagar <br></br> New Delhi, India</p>
          <p className='text-gray-500'>(91) 8977574973 <br></br> Email: dummy@gamil.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn More about our teams and job openings.</p>
          <button className='border border-balck px-8 py-4 text-sm cursor-pointer hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>

        </div>

      </div>
      <NewsletterBox></NewsletterBox>
      
    </div>
  )
}

export default Contact