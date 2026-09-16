
import React from 'react';
import {Layout} from '../Layout';

export const Confirmation = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh] p-5 bg-gray-100">
        <div className="bg-white p-10 rounded-lg shadow-md text-center max-w-[500px] w-full ">
          <h2 className="text-green-600 text-2xl font-bold mb-5">Order Confirmed!</h2>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your purchase. Your order has been placed successfully.
          </p>
          <div className="bg-gray-50 p-4 rounded text-left border border-gray-200">
            <p className="mb-2"><strong>Order ID:</strong> #{Math.floor(100000000 + Math.random()*900000000)}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};



