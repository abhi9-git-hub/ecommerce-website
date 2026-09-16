import React, { useState, useEffect } from 'react'
import { Layout } from './Layout'
import { Banner } from './Banner'
import { auth, db } from '../firebaseConfigs/FirebaseConfigs'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { ProductSlider } from './some-product-components/ProductSlider'

export const Home = () => {

    function GetCurrentUser() {
    const [user, setUser] = useState('')
    const userCollectionRef = collection(db, "user")

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "user"), where("uid", "==", userlogged.uid));
            // console.log(q)
            const data = await getDocs(q);

            

            setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
          };
          getUsers();
        }
        else {
          setUser(null);
        }
      });
     }, []);
     return user
  }
    const loggeduser = GetCurrentUser();
    


  return (
    <Layout>
       <Banner/>
       <div className='slider-head flex justify-center mt-[20px]'>
            <p className='text-[55px] font-bold text-green-900'>Limited Time Deals</p>
        </div>
       <ProductSlider type={'Mobile'} />
       <ProductSlider type={'Camera'} />
       <ProductSlider type={'Laptop'} />
       <ProductSlider type={'Watch'} />
    </Layout>
    
  )
}
