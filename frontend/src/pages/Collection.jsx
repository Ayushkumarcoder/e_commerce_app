import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';

const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFileterProducts] = useState([]);

  const [category, setCatagory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  //toggle functions to filter

  const toggleCatagory = (e) =>{
    if(category.includes(e.target.value)) {
        setCatagory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
        setCatagory(prev => [...prev, e.target.value]);
    }
  }

  //toggle for subCategory

  const togglesubCategory = (e) =>{
    if(subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    }
    else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

   //apply filter

   const applyFilter = () =>{
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFileterProducts(productsCopy);
  }

  //for sortproduct

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFileterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFileterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;

    }
  }

  

  useEffect(() =>{
    applyFilter();
  },[category, subCategory, search, showSearch])

  useEffect(()=>{
    sortProduct();

  },[sortType])

 

  

  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        {/* Fileter options */}

        <div className='min-w-60'>
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt=''></img>
          </p>
          
          {/* Category filter */}

          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Categories</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Men'}  onChange={toggleCatagory}></input>
                Men
                
              </p>

              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Women'} onChange={toggleCatagory}></input>
                Women
                
              </p>

              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Kids'} onChange={toggleCatagory}></input>
                Kids
                
              </p>
            </div>
          </div>

          {/* subCategory */}

          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Topwear'} onChange={togglesubCategory}></input>
                Topwear
                
              </p>

              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Bottomwear'} onChange={togglesubCategory}></input>
                Bottomwear
                
              </p>

              <p className='flex gap-2'>
                <input type='checkbox' className='w-3' value={'Winterwear'} onChange={togglesubCategory}></input>
                Winterwear
                
              </p>
            </div>
          </div>


        </div>

        {/* Right side */}

        <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <Title text1={'ALL'} text2={'COLLECTIONS'}></Title>
            {/* Product sort */}

            <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by: Relative</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>

          </div>

          {/* Map Products */}

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {
                filterProducts.map((item, index) => (
                  <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image} ></ProductItems>
                ))
              }
          </div>
        </div>
    </div>
  )
}

export default Collection