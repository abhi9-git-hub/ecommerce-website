import { Link } from 'react-router-dom'
import React, {useState} from 'react'
import { Layout } from './Layout'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfigs/FirebaseConfigs'
import { doc } from 'firebase/firestore'

export const Login = () => {
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [errorMsg, setErrorMsg] = useState("");
      const [successMsg, setSuccessMsg] = useState("");
      const [cart, setCart] = useState([]);
      const auth = getAuth();
      const navigate = useNavigate();

      const handleLogin = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSuccessMsg('Logged in successfully, You will now be automatically redirected to home page.')


          // console.log(loggeduser.email)
          setEmail('')
          setPassword('')
          setErrorMsg('');
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/home')
          }, 3000);
        })
       .catch((error) => {
    console.log("Error code:", error.code); 

    if (error.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid email or password');
    } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('Please fill all required fields');
    } else {
        setErrorMsg('Error: ' + error.code);
    }
});
      }
      
      
  return (
    <Layout>
       <div className='login-container flex justify-center items-center pt-[50px]'>
                  <form className='login-form flex flex-col p-[5px] border border-[rgb(19,19,64)]
                  rounded-[10px] w-[300px]'>
       
                     <p className='text-[25px]'>Login</p>
       
                     {successMsg && <>
                       <div className='success-msg flex w-full justify-center bg-[rgb(229, 255, 228)
                          p-[3px] border rounded-[10px] text-green-600 bg-green-200'>
                         {successMsg}
                       </div>
                     </>}
       
                     {errorMsg && <>
                       <div className='error-msg flex w-full justify-center bg-[rgb(255, 228, 228)
                            p-[3px] border rounded-[10px] text-red-600 bg-red-100'>
                         {errorMsg}
                       </div>
                     </>}
       
       
                     <label className='p-0 mt-[5px] font-bold text-base'>Email</label>
                     <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)] 
                                       text-[14px] focus:outline-2 focus:outline-blue-900 
                                       focus:border-transparent'
                            onChange={(e)=>setEmail(e.target.value)}
                            type='text' placeholder='Enter Your Email' />
       
                     <label className='p-0 mt-[5px] font-bold text-base'>Password</label>
                     <input className='my-[2px] border-2 rounded-[5px] p-[3px] border-[rgb(154, 154, 154)]
                                       text-[14px] focus:outline-2 focus:outline-blue-900  
                                       focus:border-transparent'
                            onChange={(e)=>setPassword(e.target.value)}
                            type='text' placeholder='Enter Your Password' />
       
                     <button className='my-[20px] font-[20px] text-white border border-none rounded-[10px]
                                       p-[5px] bg-gradient-to-br from-purple-700 to-blue-500
                                        hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
                                         focus:ring-blue-900 dark:focus:ring-blue-800
                                         leading-5">Purple to Blue cursor-pointer'
                             type='submit' onClick={handleLogin}>Login</button>
       
                     <div>
                       <span>Don't Have an Account?</span>
                       <Link to='/signup'>Sign Up</Link>
                     </div>
       
                  </form>
              </div>
    </Layout>
    
  )
}

 