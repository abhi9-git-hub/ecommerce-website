import React from 'react'
import { Link } from 'react-router-dom';

export const ProductContainer = (product) => {
    let p = product.product
    // console.log(p)
    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = Math.floor(p.price);
    mrp = Math.floor(mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp);
    const salesprice = Math.floor(mrp - extraforfun*mrp);


    




  return (
    <div className='product-container flex flex-row bg-[rgb(255,255,255)] m-[5px] w-[500px] border 
    shadow-[0px_0px_5px_0px_grey] justify-evenly p-[10px] items-center h-[300px] '>
         <img className='h-fit w-fit max-h-[250px] ' src={p.productimage} />
         <div className='product-details w-[70%]' >
            <a href={`/product/${p.producttype}/${p.id}`}>
                <button className='producttitle text-[35px] font-semibold hover:cursor-pointer
                hover:text-purple-900 ' >{p.producttitle}</button>
            </a>
             <div className='price-container flex p-0 m-0 flex-col'>
                <p className='mrp flex m-0 leading-none p-[5px]'>MRP:<p className='rate text-red-500 ml-[5px] border line-through'>₹{mrp}</p></p>
                <p className='salesprice flex m-0 leading-none p-[5px]'>Discount Price:<p className='rate
                text-[#8ecc32] ml-[5px]'>₹{salesprice}</p></p>
                <p className='yousave flex m-0 leading-none p-[5px]'>You Save: ₹{mrp - salesprice}</p>
             </div>

            <a href={`/product/${p.producttype}/${p.id}`}>
               <button className='showmore-btn bg-white text-green-900 border-2 border-green-900 p-[5px] 
                 rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500'>More Details &gt;</button>
            </a>

            
         </div>
    </div>
  )
}
