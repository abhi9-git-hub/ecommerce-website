import { Layout } from '../Layout';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebaseConfigs/FirebaseConfigs';

export const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (user) {
       
        const q = query(
          collection(db, 'orders'), 
          where('userId', '==', user.uid)
        );
       
        
        const querySnapshot = await getDocs(q);
        const orderList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setOrders(orderList);
      }
    };

    fetchOrders();
  }, [auth]);

  

  return (

    <Layout>
      <div className="max-w-4xl mx-auto p-6 font-sans">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>
      
      
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders at the moment.</p>
      ) : (
        <div className="space-y-4">
       
          {orders.map((order) => 
      
          (
            
            <div 
              key={order.id} 
              className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  <strong>Order ID:</strong> {order.id}
                </span>
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {order.status || 'Completed'}
                </span>
              </div>
             
              <div className="border-t border-gray-100 pt-3 mt-2">

                <strong>Products:</strong>
                {order.product && order.product.map((item, index) => (
                  <p key={index} className='text-lg font-medium text-gray-800'>
                    {item.product?.producttitle}
                  </p>
                ))}
               
              </div>

              <div>
                <p className="text-gray-600 mt-1">
                  <strong>Price:</strong> ₹{order.salesprice}
                </p>
              </div>

           
            </div>
          ))}
          </div>
       
          
      )}
    </div>
    </Layout>
  
  );
};

