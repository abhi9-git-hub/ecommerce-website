import React from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import applogo from './assets/applogo.png'
import { auth, db } from '../firebaseConfigs/FirebaseConfigs'
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { HiMiniUserCircle } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
     function GetCurrentUser() {
        const [user, setUser] = useState('')
        const userCollectionRef = collection(db, "user")
    
        useEffect(() => {
          auth.onAuthStateChanged((userlogged) => {
            if (userlogged) {
              const getUsers = async () => {
                const q = query(collection(db, "user"), where("uid", "==", userlogged.uid));
                    console.log(q)
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

        const navigate = useNavigate();

        const handleLogout = () => {
            auth.signOut().then(() => {
                navigate("/login")
            })
        }

        const [cartdata, setcartdata] = useState([]);
        if (loggeduser) {
          const getcartArray = async () => {
            const cartArray = [];
            const path = `cart-${loggeduser[0].uid}`
          
          getDocs(collection(db, path)).then((QuerySnapshot) => {
            QuerySnapshot.forEach((doc) => {
            
              cartArray.push({...doc.data(), id: doc.id })
            })
            setcartdata(cartArray)
            
          }).catch('Error error error')
        }
        getcartArray()
      }

  return (
     <div>
          <div className='flex w-100% bg-[rgb(19,19,64)] items-center justify-between'>



             <div className='LeftContainer'>
                  <img className="w-[100px]" src={applogo} />
             </div>



             <div className='RightContainer'>
                {!loggeduser && <nav className='flex items-center p-0 '>
                    <Link to='/'><button className='m-[1px_5px] bg-[rgb(19,19,64)] text-white p-[2px]
                     hover:bg-white hover:text-red-400 hover:border hover:rounded-[10px]'>Home</button></Link>
                    <Link to='/signup'><button className='m-[1px_5px] bg-[rgb(19,19,64)] text-white p-[2px]
                     hover:bg-white hover:text-red-400 hover:border hover:rounded-[10px]'>Signup</button></Link>
                    <Link to='/login'><button className='m-[1px_5px] bg-[rgb(19,19,64)] text-white p-[2px]
                     hover:bg-white hover:text-red-400 hover:border hover:rounded-[10px]'>Login</button></Link>

                    <Link to='/cart'>
                    <div className='cart-btn flex items-center p-[10px]'>
                          <FaShoppingCart size={30} color="white" />
                          <span className='cart-icon-css text-white bg-red-400 w-[20px] h-[20px] flex
                          items-center justify-center border rounded-[30px] relative top-[2px] right-[8px]
                          hover:bg-white hover:text-red-400 hover:cursor-pointer  '
                          >0</span>
                    </div>
                    </Link>

                    <Link to="/userprofile">   
                        <div  className="profile-icon pr-[20px] ">
                            <HiMiniUserCircle color="white" size={30} />
                        </div>
                    </Link>
               </nav>}
               {loggeduser && 
               <nav className='flex items-center p-0'>
                    <Link to='/'><button className='m-[1px_5px] bg-[rgb(19,19,64)] text-white p-[2px]
                     hover:bg-white hover:text-red-400 hover:border hover:rounded-[10px]'>Home</button></Link>

                     <Link to='/sellproduct'><button className='m-[1px_5px] bg-[rgb(19,19,64)] text-white p-[2px]
                     hover:bg-white hover:text-red-400 hover:border hover:rounded-[10px]'>Sell</button></Link>

                    <Link to='/cart'>
                    <div className='cart-btn flex items-center p-[10px]'>
                    <FaShoppingCart size={30} color="white"/>
                    <span className='cart-icon-css text-white bg-red-400 w-[20px] h-[20px] flex
                    items-center justify-center border rounded-[30px] relative top-[2px] right-[8px]
                     hover:bg-white hover:text-black hover:cursor-pointer'
                    >{cartdata.length}</span>
                </div>
                </Link>

                 <Link to="/userprofile">
                    <div  className="profile-icon pr-[20px] ">
                            <HiMiniUserCircle color="white" size={30} />
                        </div>
                </Link>

                <button className='logout-btn m-[1px_5px] bg-red-400 font-sans border rounded-[10px]
                 p-[2px] text-white hover:bg-white hover:text-red-400 hover:cursor-pointer ' onClick={handleLogout}>Logout</button>



               </nav>}
             </div>

          </div>
          <div className='product-types bg-green-900 flex justify-center '>
               <a href='/product-type/mobiles'><button
               className='p-[0px_5px] m-[8px_15px] border-2 border-white text-white rounded-[5px]
               text-[13px] hover:bg-white hover:text-black hover:font-semibold
                                    '>Mobiles</button></a>
               <a href='/product-type/laptops'><button 
               className='p-[0px_5px] m-[8px_15px] border-2 border-white text-white rounded-[5px] 
               text-[13px] hover:bg-white hover:text-black hover:font-semibold
                                    '>Laptops</button></a>
               <a href='/product-type/cameras'><button 
               className='p-[0px_5px] m-[8px_15px] border-2 border-white text-white rounded-[5px] 
               text-[13px] hover:bg-white hover:text-black hover:font-semibold
                                    '>Cameras</button></a>
               <a href='/product-type/watches'><button 
               className='p-[0px_5px] m-[8px_15px] border-2 border-white text-white rounded-[5px] 
               text-[13px] hover:bg-white hover:text-black hover:font-semibold
                                    '>Watches</button></a>
          </div>
     </div>
    

           )
}
