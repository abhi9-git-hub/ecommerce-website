import React from 'react'
import { Layout } from './Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebaseConfigs/FirebaseConfigs'
import { collection, addDoc } from 'firebase/firestore'

export const Signup = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then ((userCredential) => {
      const user = userCredential.user;
      const initialCartValue = 0;
      console.log(user);

      addDoc(collection(db, "user"), {
        username: username, email: email, phoneNumber: phoneNumber, password: password, 
        cart: initialCartValue, address: address, uid: user.uid
      }).then(() => {
          setSuccessMsg('New user added successfully, You will now be automatically redirected to login page.')
          setUserName('')
          setPhoneNumber('')
          setEmail('')
          setPassword('')
          setErrorMsg('')
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/login')
          }, 4000);
      })
      .catch((error) => {setErrorMsg(error.message)});
    })
    .catch((error) => {
      if (error.message === 'Firebase: Error (auth/invalid-email).')
      {
        setErrorMsg('Please fill all required fields')
      }
      if (error.message === 'Firebase: Error (auth/email-already-in-use)') {
        setErrorMsg('User already exists');
      }
    });
  }


  return (
    <Layout>
       <div className='signup-container flex justify-center items-center pt-[50px]'>
           <form className='signup-form flex flex-col p-[5px] border border-[rgb(19,19,64)]
           rounded-[10px] w-[350px] '>

              <p className='text-[25px]'>Create Account</p>

              {successMsg && <>
                <div className='success-msg flex w-full justify-center
                   p-[3px] border rounded-[10px] text-green-600 bg-green-200'>
                  {successMsg}
                </div>
              </>}

              {errorMsg && <>
                <div className='error-msg flex w-full justify-center)
                     p-[3px] border rounded-[10px] text-red-600 bg-red-100'>
                  {errorMsg}
                </div>
              </>}

              <label className='p-0 mt-[5px] font-bold text-base'>Your Name</label>
              <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                text-[14px] focus:outline-2 focus:outline-blue-950  
                                focus:border-transparent'
                     onChange={(e)=>setUserName(e.target.value)}
                     type='text' placeholder='First and Last Name' /> 

              <label className='p-0 mt-[5px] font-bold text-base'>Mobile Number</label>
              <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                 text-[14px] focus:outline-2 focus:outline-blue-950 
                                focus:border-transparent'
                     onChange={(e)=>setPhoneNumber(e.target.value)}
                     type='text' placeholder='Mobile Number' />

              <label className='p-0 mt-[5px] font-bold text-base'>Email</label>
              <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                text-[14px] focus:outline-2 focus:outline-blue-950 
                                focus:border-transparent'
                     onChange={(e)=>setEmail(e.target.value)}
                     type='text' placeholder='Enter Your Email' />

              <label className='p-0 mt-[5px] font-bold text-base'>Password</label>
              <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                text-[14px] focus:outline-2 focus:outline-blue-950  
                                focus:border-transparent'
                     onChange={(e)=>setPassword(e.target.value)}
                     type='text' placeholder='Enter Your Password' />

              <label className='p-0 mt-[5px] font-bold text-base'>Address</label>
              <textarea className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                text-[14px] focus:outline-2 focus:outline-blue-950 
                                focus:border-transparent'
                        onChange={(e)=>setAddress(e.target.value)}
                        type='text' placeholder='Enter Your Address' />

              <button className='my-[20px] font-[20px] text-white border border-none rounded-[10px]
                                p-[5px] bg-gradient-to-br from-purple-700 to-blue-500
                                 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                                  focus:ring-blue-950 dark:focus:ring-blue-800
                                  leading-5">Purple to Blue cursor-pointer'
                      type='submit' onClick={handleSubmit}>Sign up</button>

              <div>
                <span>Already Have an Account?</span>
                <Link to='/login'>Sign In</Link>
              </div>

           </form>
       </div>
    </Layout>   
  )
}
