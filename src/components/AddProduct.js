import React, { useState, useEffect } from 'react'
import { Layout } from './Layout'
import { auth, db } from '../firebaseConfigs/FirebaseConfigs'
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'


export const AddProduct = () => {
    const [producttitle, setProductTitle] = useState("");
    const [producttype, setProductType] = useState("");
    const [keyspecs, setKeyspecs] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [customersupport, setCustomerSupport] = useState("");
    const [price, setPrice] = useState("");
    const [warranty, setWarranty] = useState("");
    const [productimage, setProductImage] = useState("");

    const [imageError, setImageError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [uploadError, setUploadError] = useState("");


    function GetCurrentUser() {
        const [user, setUser] = useState('')
        const userCollectionRef = collection(db, "user")
    
        useEffect(() => {
          auth.onAuthStateChanged((userlogged) => {
            if (userlogged) {
              const getUsers = async () => {
                const q = query(collection(db, "user"), where("uid", "==", userlogged.uid));
               
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

      const types = ['image/jpg', 'image/jpeg', 'image/png', 'image/PNG', 'image/webp']
      const handleProductImg = (e) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('')
            }
            else{
                setProductImage(null)
                setImageError('Please select a valid image file type(png or jpg) ')
            }
        }
        else {
           setImageError('Please select your file')
        }
      }
        const loggeduser = GetCurrentUser();
        // if(loggeduser) {
        //   console.log(loggeduser[0].email)
        // }

     const uploadImageToCloudinary = async () => {
    const data = new FormData();

    data.append("file", productimage);
    data.append("upload_preset", "ecommerce_upload");

    try {
        const response = await fetch(
            "https://api.cloudinary.com/v1_1/dqldtounm/image/upload",
            {
                method: "POST",
                body: data
            }
        );

        const result = await response.json();

        return result.secure_url;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

        const handleAddProduct = async (e) => {
    e.preventDefault();

    setSuccessMsg('');
    setUploadError('');

    try {

        if (!productimage) {
            setUploadError('Please select an image');
            return;
        }

     
        const imageUrl = await uploadImageToCloudinary();

       
        await addDoc(
            collection(db, `products-${producttype.toUpperCase()}`),
            {
                producttitle,
                producttype,
                description,
                brand,
                customersupport,
                price,
                warranty,
                productimage: imageUrl,
                createDate: new Date(),
                keyspecs:keyspecs,
            }
        );

        setSuccessMsg('Product added successfully');

        // Reset form
        setProductTitle("");
        setProductType("");
        setDescription("");
        setBrand("");
        setCustomerSupport("");
        setPrice("");
        setWarranty("");
        setProductImage("");

    } catch (error) {
        console.log(error);
        setUploadError('Failed to upload product');
    }
}

  return (
    <Layout>
         {loggeduser && loggeduser[0].email == "aman@gmail.com" ? 

         <div className='addprod-container flex justify-center pt-[20px]'>
            <form className='addprod-form flex flex-col p-[0px_10px] border-2 
            rounded-[12px] w-[600px] border-blue-950' 
            onSubmit={handleAddProduct}>
                <p className='text-[20px] m-0'>Add Data</p>
                {successMsg && <div className='success-msg flex w-full justify-center
                   p-[3px] border rounded-[10px] text-green-600 bg-green-200'>
                {successMsg}</div>}
                {uploadError && <div className='error-msg flex w-full justify-center
                     p-[3px] border rounded-[10px] text-red-600 bg-red-100'>
                {uploadError}</div>}

                 <label className='p-0 mt-[5px] font-bold text-[12px]'>Product Title</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setProductTitle(e.target.value)} 
                  placeholder='Product Title' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Product Type</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setProductType(e.target.value)}
                  placeholder='Product Type' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Brand Name</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setBrand(e.target.value)}
                  placeholder='Brand Name' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Warranty</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setWarranty(e.target.value)}
                  placeholder='Product Warranty' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Image</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[10px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='file' accept='image/*' onChange={handleProductImg} />
                 {imageError && <>
                     <div className='error-msg flex w-full justify-center
                     p-[3px] border rounded-[10px] text-red-600 bg-red-100'>
                     {imageError}</div>
                 </>}

                 <label className='p-0 mt-[3px] font-bold text-[12px]'>Price Without Tax</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setPrice(e.target.value)}
                  placeholder='Price' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Key Specification</label>
                 <textarea className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none'
                  onChange={(e)=>setKeyspecs(e.target.value)} 
                  placeholder='Enter some key specification' />

                
                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Description</label>
                 <textarea className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none'
                  onChange={(e)=>setDescription(e.target.value)} 
                  placeholder='Describe your product in brief' />

                  <label className='p-0 mt-[3px] font-bold text-[12px]'>Customer Support</label>
                 <input className='m-[2px_0px] border-2 rounded-[5px] p-[3px] border-[rgb(154,154,154)]
                 text-[12px] focus:outline-2px focus:outline-blue-950 focus:border-none' 
                 type='text' onChange={(e)=>setCustomerSupport(e.target.value)}
                  placeholder='Customer Support Email, Phone or address' />

                  <button type='submit' className='my-[15px] font-[12px] text-white border border-none rounded-[10px]
                                p-[3px] bg-gradient-to-br from-purple-700 to-blue-500
                                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                                  focus:ring-blue-950 dark:focus:ring-blue-800
                                  leading-5">Purple to Blue cursor-pointer'>Add</button>

            </form>
         </div> : 
         
         <div className='flex flex-col justify-center items-center pt-[180px]'>
              <p className=' text-[50px] text-green-900 border-2 border-green-900 rounded-[10px]'> 
              You don't have access to add products</p>
         </div>}
    </Layout>
   
  )
}
