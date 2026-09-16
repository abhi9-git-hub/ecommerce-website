import { Link } from 'react-router-dom'
import { Layout } from './Layout'
import { auth, db } from '../firebaseConfigs/FirebaseConfigs'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'


export const UserProfile = () => {

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
        <div className='userprofile-outercontainer flex flex-col gap-5 mt-[100px] justify-center items-center'>
            {loggeduser ? <div className='user-profile bg-gradient-to-br from-purple-700 to-blue-500
            p-[10px] border-2 border-blue-950 rounded-[10px] w-[500px]'>
                  <p className='text-3xl text-white font-bold p-[10px] mb-[10px]'>Your Account Details</p>

                  <div className='data-row flex flex-row text-white'>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-r-0 border-blue-950 text-[18px]'>Your Name </span>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-blue-950 text-[18px]'>{loggeduser[0].username}</span>
                  </div>

                   <div className='data-row flex flex-row text-white'>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-r-0 border-blue-950 text-[18px]'>Your Email </span>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-blue-950 text-[18px]'>{loggeduser[0].email}</span>
                  </div>

                   <div className='data-row flex flex-row text-white'>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-r-0 border-blue-950 text-[18px]'>Your Phone Number </span>
                     <span className='w-1/2 p-[10px] border-2 border-b-0 border-blue-950 text-[18px]'>{loggeduser[0].phoneNumber}</span>
                  </div>

                   <div className='data-row flex flex-row text-white'>
                     <span className='w-1/2 p-[10px] border-2 border-r-0 border-blue-950 text-[18px]'>Your Address </span>
                     <span className='w-1/2 p-[10px] border-2 border-blue-950 text-[18px]'>{loggeduser[0].address}</span>
                  </div>
            </div> : 
            
            <div>
              You are not Logged In
            </div>}

           
           <Link to="/MyOrder">
                   <button className='bg-white text-green-900 border-2 border-green-900 p-[5px] 
                         rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500'>My Orders</button>
        
           </Link>
          
         </div>  

       
    </Layout>
    
  )
}
