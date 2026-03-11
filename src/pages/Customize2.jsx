import React, { useContext, useState } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

const Customize2 = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)
  const {userData, selectedImg, setUserData, backendImg} = useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "" );
  const [voicePreference, setVoicePreference] = useState(userData?.voicePreference || "girl");

    const handleUpdateAssistant = async () => {
      setloading(true)
      try {
        const formData = new FormData();
        formData.append('assistantName',assistantName);
        formData.append('voicePreference', voicePreference);
        
      if (backendImg) {
        formData.append("assistantImg", backendImg); // file
      } else {
        formData.append("imageUrl", selectedImg); // text
      }

        const response = await api.post(
          '/api/v1/user/update',
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log(response.data);
        setloading(false);
        setUserData(response.data);
        navigate('/');
      } catch (error) {
        
        console.log("Update failed", error);
      }
    }
  return (
    <div className='cardcontainer py-5 h-screen w-screen overflow-hidden flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-black via-[#030250] to-[#0a0a2e] relative'>
      {/* Title Section */}
      <div className='text-center'>
        <h1 className='text-4xl lg:text-5xl text-white font-bold mb-2'>Name Your</h1>
        <p className='text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold'>AI Assistant</p>
      </div>
      
      {/* Input Section */}
      <div className='w-full max-w-md px-6'>
        <input  
          className='assistantName w-full px-6 py-4 border-2 border-white/30 rounded-xl bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:bg-white/10 transition-all text-2xl text-center' 
          type="text" 
          placeholder='e.g., Aria, Nova, Elli' 
          name='assistantName' 
          onChange={(e) => {setAssistantName(e.target.value)}} 
          value={assistantName}
        />
        <p className='text-center text-gray-400 text-sm mt-3'>This will be the name you use to command your assistant</p>
      </div>
      
      {/* Voice Preference Section */}
      <div className='w-full max-w-md px-6'>
        <label className='block text-white text-lg font-semibold mb-2'>Voice Preference</label>
        <select
          className='w-full px-6 py-4 border-2 border-white/30 rounded-xl bg-white/5 backdrop-blur-sm focus:border-blue-400 focus:bg-white/10 transition-all text-xl text-center text-white'
          value={voicePreference}
          onChange={(e) => setVoicePreference(e.target.value)}
        >
          <option value="girl" className='text-black'>Girl Voice</option>
          <option value="boy" className='text-black'>Boy Voice</option>
        </select>
        <p className='text-center text-gray-400 text-sm mt-3'>Choose the voice for your AI assistant</p>
      </div>
        
      {/* Buttons */}
      <div className='flex gap-3 flex-wrap justify-center mt-6'>
        <Link 
          to='/customize' 
          className={`${loading ? 'cursor-not-allowed opacity-50' : ''} disabled:opacity-50 select bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-2xl rounded-xl p-3 border border-white/30 transition-all transform hover:-translate-y-1`}
        >
          <IoMdArrowRoundBack />
        </Link>
        
        <button 
          className={`${
            !assistantName 
              ? 'opacity-50 cursor-not-allowed' 
              : 'opacity-100 hover:shadow-2xl hover:-translate-y-1'
          } ${loading ? 'cursor-not-allowed' : ''} select bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl px-8 py-3 transition-all transform disabled:cursor-not-allowed`}
          disabled={loading || !assistantName} 
          onClick={() => {
            handleUpdateAssistant()
          }}
        >
          {loading ? (
            <span className='flex items-center gap-2'>
              <span className='inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
              Creating...
            </span>
          ) : (
            <span>✨ Create Assistant</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Customize2