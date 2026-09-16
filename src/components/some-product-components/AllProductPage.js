import { ProductContainer } from './ProductContainer'
import React, { useState,useEffect } from 'react'
import { Layout } from '../Layout'
import {
    collection,
    query,
    onSnapshot, getDocs
} from "firebase/firestore";
import { db } from "../../firebaseConfigs/FirebaseConfigs";

export const AllProductPage = (props) => {
   

    const [products, setProduts] = useState([]);

    useEffect(() => {
        const getProducts = () => {
            const productsArray = [];
            const path = `products-${props.type.toUpperCase()}`;
          

            getDocs(collection(db, path)).then((querySnapshot)=> {
                querySnapshot.forEach((doc)=> {
                    productsArray.push({...doc.data(),id:doc.id})
                    console.log(doc.id, " => ", doc.data());
                })
                setProduts(productsArray)
            }).catch((error) => {
                console.log(error.message)
            })
        }
         getProducts();
    }, [])
    
  return (
    <Layout>

      <div className='allproductpage bg-[rgb(240,240,240)] h-[100px] flex justify-center items-center'>
       
        <div className='heading text-[50px]'>
           <p>Top Results for {props.type}</p>
        </div>

         </div>

         <div className='allproductcontainer flex flex-row flex-wrap justify-center items-center mt-[20px]'>
              {products.map((product)=>(
                <ProductContainer
                    key={product.id}
                    product={product}
                />
              ))}
         </div>
    
     
    </Layout>
    
    
  )
}
