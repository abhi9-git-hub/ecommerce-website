import React, { useState } from 'react';
import { Layout } from '../Layout'; // अपने प्रोजेक्ट के हिसाब से पाथ एडजस्ट कर लें
import { db } from '../../firebaseConfigs/FirebaseConfigs';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebaseConfigs/FirebaseConfigs';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Checkout = () => {
  
  const location = useLocation();
  const { product, salesprice, cartdata, totalprice } = location.state || {};
  
 
console.log("kaho", salesprice)
  const orderItems = product ? [{ product: { producttitle: product, salesprice: salesprice }, quantity: 1}] : cartdata;



  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    phone: ''
  });

  const navigate = useNavigate();



 const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };




  const handleOrderSubmit = async (e) => {
  e.preventDefault();

  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const options = {
    key: 'rzp_test_TblDx5PLrxrDW0', 
    currency: 'INR',
    amount: salesprice * 100, // Amount in paise
    name: 'Your E-commerce Store',
    description: 'Order Payment',
    handler: async function (response) {
      alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
      try {
        await addDoc(collection(db, 'orders'), {
          shippingDetails,
          userId: auth.currentUser.uid,
          product: orderItems,
          salesprice: cartdata ? totalprice: salesprice,
          createdAt: new Date(),
          paymentId: response.razorpay_payment_id,
        });
        alert('Order placed successfully!');
        navigate('/confirmation');
      } catch (error) {
        console.error("Error adding document: ", error);
        alert('Failed to place order...');
      }
    },
    prefill: {
      name: shippingDetails.name,
      email: 'user@example.com', 
      contact: shippingDetails.phone,
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};






 return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4 border-2 
            rounded-[12px] border-blue-950 p-4">Checkout Page</h2>
        
        <div className="w-full max-w-md bg-white p-4 shadow mb-6 border-2 
            rounded-[12px] border-blue-950">
          <h3 className="text-lg font-semibold mb-2  border-2 
            rounded-[12px] border-blue-950 flex justify-center">Order Summary</h3>
          {orderItems.length === 0 ? (
            <p className="text-gray-500">No items in cart</p>
             
          ) : (orderItems.map((item) => (
                       <div key={item.id} className="flex justify-between items-center border-b-2 border-blue-950 py-2">
                <div>
                  <p className="font-medium">{item.product.producttitle || 'Product'}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                </div>

                <div className='flex flex-col justify-between items-center py-4'>
                  <p className='font-medium'>Item Price:</p>
                 <p className="text-gray-500">₹{item.product.salesprice}</p>
                </div>
           </div>
            ))
          )}

           <div className='flex flex-col justify-between items-center border-t py-4'>
                  <p className='text-lg font-bold'>Total Price:</p>
                  <p className='text-lg semi-bold'>₹{salesprice ? salesprice : totalprice}</p>
           </div>

           
           
              
        </div>


    <div>
        <form onSubmit={handleOrderSubmit} className='addprod-form flex flex-col p-[0px_10px] border-2 
            rounded-[12px] w-[600px] border-blue-950'>
          
            <label className='p-0 mt-[5px] font-bold text-[12px]'>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={shippingDetails.name}
              onChange={handleChange}
              required 
              className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
              placeholder="Enter your full name"
            />
      
          
            <label className='p-0 mt-[5px] font-bold text-[12px]'>Shipping Address</label>
            <input 
              type="text" 
              name="address"
              value={shippingDetails.address}
              onChange={handleChange}
              required 
              className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
              placeholder="Enter your address"
            />
      
          
            <label className='p-0 mt-[5px] font-bold text-[12px]'>City</label>
            <input 
              type="text" 
              name="city"
              value={shippingDetails.city}
              onChange={handleChange}
              required 
              className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
              placeholder="Enter your city"
            />
        
          
            <label className='p-0 mt-[5px] font-bold text-[12px]'>Mobile Number</label>
            <input 
              type="text" 
              name="phone"
              value={shippingDetails.phone}
              onChange={handleChange}
              required 
              className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
              placeholder="Enter your mobile number"
            />
        
          <button 
            type="submit" 
            className='my-[15px] font-[12px] text-white border border-none rounded-[10px]
                                p-[3px] bg-green-900 hover:bg-black leading-5 ' >
                   Confirm Order
          </button>
        </form>
      </div>
      </div>
    </Layout>
  
  );




};

export default Checkout;