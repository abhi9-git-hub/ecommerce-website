import { ProductContainer } from './ProductContainer'
import React, { useState,useEffect } from 'react'
import { Layout } from '../Layout'
import {
    collection,
    query,
    onSnapshot, getDocs
} from "firebase/firestore";
import { db } from "../../firebaseConfigs/FirebaseConfigs";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {SliderProductCard} from './SliderProductCard';

export const ProductSlider = (props) => {

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

        const responsive = {
         superLargeDesktop: {
  
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

  return (
    <div>
        <Carousel responsive={responsive}>
            {products.map((product)=>
            (<SliderProductCard key={product.id} product={product} />)
            )}
        </Carousel>
    </div>
  )
}
