import React, { useContext } from 'react'
import { UserDataContext } from '../Context/UserContext.jsx';

const Card = ({image}) => {
  const {selectedImg, setFrontendImg, setSelectedImg, setBackendImg} = useContext(UserDataContext);

  return (
    <div className={`card h-[280px] sm:h-[320px] w-[160px] sm:w-[200px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl overflow-hidden border-2 transition-all transform hover:-translate-y-2 cursor-pointer relative ${
      selectedImg == image ? 'selected border-blue-400 shadow-lg shadow-blue-500/50' : 'border-white/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30'
    }`}
    onClick={()=> {
      setSelectedImg(image)
      setBackendImg(null)
      setFrontendImg(null)
    }}>
      <img src={image} className='h-full w-full object-cover' alt='assistant option' />
      {selectedImg === image && (
        <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
          <div className='text-white text-2xl font-bold'>✓</div>
        </div>
      )}
    </div>
  )
}

export default Card
