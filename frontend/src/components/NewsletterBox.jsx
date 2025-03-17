import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% OFF</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ipsam beatae! Possimus, praesentium. Quaerat provident amet omnis perferendis magni expedita delectus tempore esse placeat voluptatum! Nemo vel beatae sequi explicabo?
        </p>

        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none ' type='email' placeholder='Enter your email id' required></input>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4 cursor-pointer'>SUBSCRIPTION</button>
        </form>
    </div>
  )
}

export default NewsletterBox