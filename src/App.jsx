import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import Signin from './pages/Signin.jsx'
import UserContext, { UserDataContext } from './Context/UserContext.jsx'
import Home from './pages/Home.jsx'
import Customize from './pages/Customize.jsx'
import Customize2 from './pages/Customize2.jsx'

const App = () => {
  const {userData, isLoading} = useContext(UserDataContext);

  if (isLoading) {
    return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Loading...</div>;
  }

  return (
    <div>
        <Routes>
          <Route path='/' element={(userData?.assistantImg && userData?.assistantName) ? <Home/> : <Navigate to={'/customize'}/> }/>
          <Route path='/signup' element={!userData ? <AuthPage/> : <Navigate to={'/'}/>}/>
          <Route path='/signin' element={!userData ? <Signin/> : <Navigate to={'/'}/>}/>
          <Route path='/customize' element={userData? <Customize/> : <Navigate to={'/signup'}/> }/>
          <Route path='/customize2' element={userData? <Customize2/> : <Navigate to={'/signin'}/> }/>  
        </Routes>
    </div>
  )
}

export default App
