import { useContext, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext.jsx';
import api from '../api/axios.js';

const AuthPage = () => {
  const [errMessage, setErrMessage] = useState("");
  const {userData, setUserData} = useContext(UserDataContext)


  const handleSignup = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
          const response = await api.post('/api/v1/auth/signup', data, {withCredentials: true});
            setUserData(response.data);
            setErrMessage("");
            <Navigate to={'/customize'}/>
        } catch (error) {
          const errorString = error.response?.data?.message || "An unexpected error occurred";
          setErrMessage(errorString);
          setUserData(null);
          console.error("Signup Error:", error.response?.data || error.message);
        }
    }

  return (
    <div className='login_form text-white font-semibold h-screen w-screen flex justify-end lg:justify-center p-8 lg:p-24 items-center'>
      <form onSubmit={handleSignup} className='form_container flex flex-col items-center gap-5 w-full lg:w-auto'>
        <div className='text-center mb-4'>
          <h1 className='text-4xl mb-2'>Create Account</h1>
          <p className='text-gray-300'>Join Virtual Assistant</p>
        </div>

        <div className='w-full lg:w-[350px] space-y-3'>
          <input 
            className='w-full p-3 border-2 border-white/30 rounded-xl bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:bg-white/10' 
            type="text" 
            placeholder='Full Name' 
            name='username'
            required
          />
          
          <input 
            className='w-full p-3 border-2 border-white/30 rounded-xl bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:bg-white/10' 
            type="email" 
            placeholder='Email Address' 
            name='email'
            required
          />
          
          <input 
            className='w-full p-3 border-2 border-white/30 rounded-xl bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:bg-white/10' 
            type="password" 
            placeholder='Password' 
            name='password'
            required
          />
        </div>

        {errMessage && (
          <div className='w-full lg:w-[350px] bg-red-500/20 border border-red-500/50 rounded-lg px-4 py-3'>
            <p className='text-red-300 text-sm font-medium'>⚠ {errMessage}</p>
          </div>
        )}

        <button className='w-full lg:w-[150px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2.5 rounded-xl transition-all transform hover:-translate-y-1 cursor-pointer mt-2'>
          Sign Up
        </button>

        <p className='text-center text-gray-300 text-sm'>
          Already have an account? <Link to='/signin' className='text-blue-400 hover:text-blue-300 font-semibold transition'>Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default AuthPage