import { deleteDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { db } from '../firebaseConfigs/FirebaseConfigs'
import { doc, updateDoc } from 'firebase/firestore';

export const CartCard = ( props ) => {
    


    const [prodquantity, setProdQuantity] = useState(props.itemdata.quantity);

    const p = props.itemdata.product.price;

    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforfun = 10/100;

    let mrp = Math.floor(p)
    mrp = Math.floor(mrp + overalltax*mrp + overcommission*mrp + extraforfun*mrp);
    const salesprice = Math.floor(mrp - extraforfun*mrp)*prodquantity;

    console.log(salesprice);
    
    const increaseQuantity = async () => {
        setProdQuantity(prodquantity + 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
          quantity: prodquantity + 1
        }).then(() => {console.log('changed quantity')})
    }
    const decreaseQuantity = async () => {
        if (prodquantity >= 1) {
        setProdQuantity(prodquantity - 1)

        const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
        await updateDoc(itemref, {
          quantity: prodquantity - 1
        }).then(() => {console.log('changed quantity')})
        }
    }

    const deletecartitem = async() => {
        await deleteDoc(doc(db, `cart-${props.userid}`, `${props.itemdata.id}`))
          .then(() => {
            console.log('doc deleted')
            props.removeCartItem(props.itemdata.id)
          })
    }
    
  return (
    <div className='cart-prod-container flex shadow-[0px_0px_2px_0px_grey] m-[5px] border rounded-[10px]
    p-[10px] items-center justify-between w-[900px]'>
        <div className='cart-prod-imgtitle flex w-[40%] items-center'>
            <div className='prod-image w-[50px] h-[50px] mr-[10px]'><img className='max-w-full max-h-full'
            src={props.itemdata.product.productimage} alt='product'/></div>
            <div className='prod-title text-[22px]'>{props.itemdata.product.producttitle}</div>
        </div>
        <div className='prodquantity-div flex items-center justify-evenly bg-white p-[10px_0px] border-2 rounded-[10px]
        border-green-900 w-[120px]'>
             <button className="border-2 border-green-900 bg-white text-[20px] text-green-900
             w-[30px] h-[30px] rounded-[40px]"  onClick={increaseQuantity}>+</button>
             <p className='text-green-900'>{prodquantity}</p>
             <button className="border-2 border-green-900 bg-white text-[20px] text-green-900
             w-[30px] h-[30px] rounded-[40px]" onClick={decreaseQuantity}>-</button>
        </div>
        <div className='prodprice w-[20%] flex justify-end text-[20px] text-[rgb(115,191,2)]'>₹{salesprice}</div>
        <button className='deletebtn w-[30px] h-[30px] border-none hover:rounded-[30px] 
        hover:w-[35px] hover:h-[35px]' onClick={deletecartitem}>
               <MdDelete size={25} color='red'/>
               
        </button>

    </div>
  )
}