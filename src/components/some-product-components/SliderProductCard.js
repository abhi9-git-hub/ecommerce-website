import React from 'react'
import { Link } from 'react-router-dom';

export const SliderProductCard = (product) => {
  let p = product.product
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = Math.floor(p.price);
    mrp = Math.floor(mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp);
    const salesprice = Math.floor(mrp - extraforfun*mrp);

  return (
    <div className='mini-product-container flex flex-col bg-[rgb(255,255,255)] m-[5px] 
    border border-[rgb(245,245,2456)] shadow-[0px_0px_2px_0px_grey] p-[10px] items-center
    h-[400px] rounded-[10px]'>
         <div className='mini-img-container h-[200px] flex items-center max-w-[220px] max-h-[200px]'>
            <img  src={p.productimage} alt='product-image'/>
         </div>
         
         <div className='mini-product-details pt-[10px] mt-[10px] w-[70%]'>
               <p className='mini-producttitle text-[20px] font-semibold'>{p.producttitle}</p>

               <div className='mini-price-container flex p-0 m-0 flex-col'>
                <p className='mrp flex m-0 leading-none p-[5px]'>MRP:<p className='rate text-red-500 ml-[5px] border line-through'>₹{mrp}</p></p>
                <p className='salesprice flex m-0 leading-none p-[5px]'>Discount Price:<p className='rate
                text-[#8ecc32] ml-[5px]'>₹{salesprice}</p></p>
                <p className='yousave flex m-0 leading-none p-[5px]'>You Save: ₹{mrp - salesprice}</p>
             </div>

            <a href={`/product/${p.producttype}/${p.id}`} >
               <button className='showmore-btn bg-white text-green-900 border-2 border-green-900 p-[5px] 
                 rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500'>Show More</button>
            </a>
         </div>
    </div>
  )
}
