
import React, { useState, useEffect } from 'react';
import { Layout } from './Layout';
import { auth, db } from '../firebaseConfigs/FirebaseConfigs';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { CartCard } from './CartCard';
import { Link } from 'react-router-dom';

export const Cart = () => {

    function GetCurrentUser() {
        const [user, setUser] = useState([]);
        
        useEffect(() => {
            auth.onAuthStateChanged((userlogged) => {
                if (userlogged) {
                    const getUsers = async () => {
                        const q = query(collection(db, "user"), where("uid", "==", userlogged.uid));
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
                    };
                    getUsers();
                } else {
                    setUser(null);
                }
            });
        }, []);
        return user;
    }

    const loggeduser = GetCurrentUser();

    const [cartdata, setcartdata] = useState([]);

   
console.log("cartdata:", cartdata)
   const totalPrice = cartdata.reduce((acc, item)=> acc + (Number(item.product.salesprice)*item.quantity), 0);


    useEffect(() => {
        if (loggeduser && loggeduser.length > 0) {
            const getcartArray = async () => {
                const cartArray = [];
                const path = `cart-${loggeduser[0].uid}`;
                try {
                    const querySnapshot = await getDocs(collection(db, path));
                    querySnapshot.forEach((doc) => {
                        cartArray.push({...doc.data(), id: doc.id});
                    });
                    setcartdata(cartArray);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                }
            };
            getcartArray();
        }
    }, [loggeduser]);

    const removeCartItem = (itemId) => {
        setcartdata((prevData) => prevData.filter((item) => item.id !== itemId));
    };

    return (
        <Layout>
            {cartdata.length !== 0 ? (
                <div>
                    <div className='cart-head block m-[20px_auto] w-[300px] items-center text-[40px] font-semibold p-[3px] text-green-900 border-b-3 border-b-green-900'>Your Cart Items</div>
                    <div className='allcartitems flex flex-col items-center '>
                        {cartdata.map((item) => {
                            return (
                                <CartCard
                                    removeCartItem={removeCartItem}
                                    key={item.id}
                                    itemdata={item}
                                    userid={loggeduser[0]?.uid}
                                />
                            );
                        })}
                    </div>
                    <div className='proceed flex justify-evenly mt-5'>
                        <div className='text-xl font-bold text-green-900 my-4'>Total Price: ₹{totalPrice}</div>
                        <Link to="/checkout" state={{ cartdata: cartdata, totalprice: totalPrice }}>
                            <button className='bg-white text-green-900 border-2 border-green-900 p-[5px] rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500'>
                                Proceed
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center pt-[180px] gap-2'>
                    <p className='text-[50px] text-green-900 border-2 border-green-900 rounded-[10px] p-[10px]'>
                        Your cart is Empty
                    </p>
                    <Link to='/'>
                        <button className='bg-white text-green-900 border-2 border-green-900 p-[5px] rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500'>
                            Go to Home Page
                        </button>
                    </Link>
                </div>
            )}
        </Layout>
    );
};

export default Cart;