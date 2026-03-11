import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import api from '../api/axios.js';

export const UserDataContext = createContext();

const UserContext = ({children}) => {
  const [userData, setUserData] = useState();
  const [backendImg, setBackendImg] = useState();
  const [frontendImg, setFrontendImg] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  

  const handleCurrentUser = async () => {
        try {
          const response = await api.get('/api/v1/user/current', { withCredentials: true });
            setUserData(response.data);
          
        } catch (error) {
          console.error("Signup Error:", error.response?.data || error.message);
        } finally {
          setIsLoading(false);
        }
    }

    const assistantResponse = async (command) => {
      try {
        const response = await api.post('/api/v1/user/ask', { command }, { withCredentials: true });
        return response.data;
      } catch (error) {
        console.error("Error asking assistant:", error.response?.data || error.message);
      }
    }

    useEffect(() => {
      handleCurrentUser();
    }, [])
    

  const value = {
    userData, setUserData,
    selectedImg, setSelectedImg,
    backendImg, setBackendImg,
    frontendImg, setFrontendImg,
    isLoading,
    assistantResponse
  };

  return (
    <div>
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext