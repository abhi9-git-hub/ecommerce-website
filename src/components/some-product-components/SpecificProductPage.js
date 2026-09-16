import { ProductSlider } from './ProductSlider';
import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout';
import { useParams } from 'react-router-dom';
import { updateDoc } from 'firebase/firestore';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot
} from 'firebase/firestore';
import { auth, db } from '../../firebaseConfigs/FirebaseConfigs';
import { Spinner } from '../Spinner';
import { useNavigate } from 'react-router-dom';


export const SpecificProductPage = () => {
  const { id, type } = useParams();

  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  // const [loggeduser, setLoggeduser] = useState(user);
  const[isInCart, setIsInCart] = useState(false);
 const navigate = useNavigate();


  // Get Logged In User
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userlogged) => {
      if (userlogged) {
        const q = query(
          collection(db, "user"),
          where("uid", "==", userlogged.uid)
        );

        const data = await getDocs(q);

        setUser(data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);



  useEffect(() => {
  if (user && user.length > 0 && id) {
    const q = query(
      collection(db, `cart-${user[0].uid}`)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let found = false;

      querySnapshot.forEach((doc) => {
        if (doc.data().id === id) {
          found = true;
        }
      });

      setIsInCart(found);
    });

    return () => unsubscribe();
  }
}, [user, id]);



  // Get Product
  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // setProduct(docSnap.data());
           setProduct({...docSnap.data(), id: docSnap.id});
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    getProduct();
  }, [id, type]);

  if (!product) {
    return (
      <Layout>
        <div>
           <Spinner/>
        </div>
      </Layout>
    );
  }

  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = Math.floor(product.price);
  mrp = Math.floor(
      mrp +
      overalltax * mrp +
      overcommission * mrp +
      extraforfun * mrp
  );

  const salesprice = Math.floor(mrp - extraforfun * mrp);

  console.log("sales price : ", salesprice);

const addtocart = async() => {
   
    if (user && user.length > 0) {
        const cartRef = collection(db, `cart-${user[0].uid}`);
      
        const q = query(cartRef, where("product.id", "==", product.id));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
            const docId = querySnapshot.docs[0].id;
            const docRef = doc(db, `cart-${user[0].uid}`, docId);
            const currentQty = querySnapshot.docs[0].data().quantity || 1;

           


         setIsInCart(true)
         setSuccessMsg("This Product is already in you cart!")


        } else {
            addDoc(collection(db, `cart-${user[0].uid}`), {
                product: { ...product, salesprice: salesprice },
                quantity: 1
            })
            .then(() => {
                setSuccessMsg("Product added to cart!");
                setIsInCart(true);
            }).catch((error) => { setErrorMsg(error.message) });
        }
    } else {
        setErrorMsg("You need to login first!");
    }
}






  return (
    <Layout>

     {product ? 
           <div className="myprod-container flex">

        <div className="prod-img-cont w-[2000px] mr-[20px]">
          <img src={product.productimage} alt={product.producttitle} className='w-[100%]' />
        </div>

        <div className="prod-data">

          <p className="prod-head text-[35px] font-semibold leading-[45px]">{product.producttitle}</p>

          <p className="prod-keyspecs text-[25px]">
            {product.keyspecs}
          </p>

          <div className="specific-price-container">

            <p className="mrp text-[25px] mt-[15px]">
              MRP :
              <span className="rate text-red-500 ml-[5px] line-through">
                ₹{mrp}
              </span>
            </p>

            <p className="salesprice text-[25px]">
              Discount Price :
              <span className="rate text-[#8ecc32] ml-[5px]">
                ₹{salesprice}
              </span>
            </p>

            <p className="yousave text-[rgb(81,81,81)]">
              You Save : ₹{mrp - salesprice}
            </p>

          </div>

          <p className="prod-details-head p-0 text-[35px] m-0 mt-[20px] text-green-900 border-b-2
          border-b-green-900 w-[110px]">
            Details
          </p>

          <p className="prod-description text-[15px]">
            {product.description}
          </p>

          <div className="row-cont flex items-center justify-between w-[550px]">

             <div className='warranty-replacement flex bg-[#ffffff] p-[10px] justify-evenly
             w-[300px] border rounded-[10px] items-center shadow-[0px_0pxro_5px_0px_grey]'>
                  <div className="cod flex flex-col justify-center items-center">
              <div className="img-circle w-[40px] h-[40px] flex justify-center items-center
              border rounded-[60px] bg-white">
                <img className='w-[30px] border rounded-[20px]'
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjSPDH-7NXkoLs5-8RhyGSMBK3XUxTbnitSzzu7hK7Q&s=10" alt="" />
              </div>
              <p className='text-[13px] font-semibold text-center text-green-900'>Cash on Delivery</p>
            </div>
            <div className='warranty flex flex-col justify-center items-center'>
                 <div className='img-circle w-[40px] h-[40px] flex justify-center items-center
              border rounded-[60px] bg-white'>
                      <img src='https://cdn-icons-png.flaticon.com/512/4919/4919970.png'></img>
                 </div>
                 <p className='text-[13px] font-semibold text-center text-green-900'>{product.warranty} year warranty</p>
            </div>

            <div className='replacement flex flex-col justify-center items-center'>
                <div className='img-circle w-[40px] h-[40px] flex justify-center items-center
              border rounded-[60px] bg-white'>
                     <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH61OKaTV4d3lmFCTmUGW_bhaDbnHEndhsCzRQMiKBJA&s=10'></img>
                </div>
                <p className='text-[13px] font-semibold text-center text-green-900'>10 days replacement</p>
            </div>
             </div>

             <div className='buy-cart ml-0'>
                     <button className='showmore-btn bg-white text-green-900 border-2 border-green-900 p-[5px] 
                                  rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500' 
                              onClick={()=> navigate('/checkout', {state: {product: product.producttitle , salesprice: salesprice }})}    
                                  >
                     Buy Now</button>
                     <button className='showmore-btn bg-white text-green-900 border-2 border-green-900 p-[5px] 
                                  rounded-[5px] mr-[10px] hover:bg-black hover:text-red-500' 
                      onClick={isInCart ? () => window.location.href = "/cart" : addtocart}>{isInCart ? "Go to Cart" : "Add to Cart"}</button>
             </div>

          </div>

          {successMsg && <>
             <div className='success-msg flex w-full justify-center
                   p-[3px] border rounded-[10px] text-green-600 bg-green-200'>{successMsg}</div>
          </>}
          {errorMsg && <>
            <div className='error-msg flex w-full justify-center
                     p-[3px] border rounded-[10px] text-red-600 bg-red-100'>{errorMsg}</div>
          </>}

        </div>  
        
       
      </div>  :
      
      
       <div>
           <Spinner/>
       </div> 
       
       }

       <p className='prod-details-head2 p-0 text-[35px] m-[20px] text-green-900
       border-b-2 border-b-green-900 w-[200px]'>Similar Items</p>
       <ProductSlider type={type}></ProductSlider>
      

     

    </Layout>
  );
};