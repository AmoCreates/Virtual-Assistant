import Card from './Card.jsx'
import avios from '../assets/elli.avif'
import lame from '../assets/lame.avif'
import rouv from '../assets/rouv.jpg'
import sesi from '../assets/sesi.jpg'
import siera from '../assets/siera.webp'
import lisa from '../assets/lisa.jpg'
import jarvis from '../assets/VA_Jarvis.png'
import { RiImageAddFill } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useContext, useRef} from 'react'
import { UserDataContext } from '../Context/UserContext.jsx'
import { Link } from 'react-router-dom'


const Customize = () => {
  const inputImgRef = useRef();
  const {setSelectedImg, selectedImg, frontendImg, setFrontendImg, setBackendImg} = useContext(UserDataContext);

  const images=[
    avios, sesi, lame, rouv, siera, jarvis, lisa
  ]

  const handleImg = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setFrontendImg(URL.createObjectURL(file));
  }
  
  return (
    <div className='cardcontainer py-5 h-screen w-screen overflow-hidden flex flex-col items-center justify-evenly bg-gradient-to-br from-black via-[#030250] to-[#0a0a2e] relative'>
      {/* Header with Back Button */}
      <div className='absolute top-6 left-6 z-50'>
        <Link to='/' className='disabled:opacity-50 select bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-2xl rounded-full p-3 border border-white/30 transition-all transform hover:-translate-y-1'>
          <IoMdArrowRoundBack />
        </Link>
      </div>

      {/* Title Section */}
      <div className='text-center mt-8'>
        <h1 className='text-4xl lg:text-5xl text-white font-bold mb-2'>Customize Your</h1>
        <p className='text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold'>Assistant Avatar</p>
      </div>

      {/* Cards Container */}
      <div className='p-2 overflow-y-auto flex gap-6 flex-wrap justify-center max-w-6xl mx-auto'>
        {/* Upload Custom Image */}
        <div 
          className={`${selectedImg == 'input' ? 'selected' : 'card'} relative h-[280px] sm:h-[320px] w-[160px] sm:w-[200px] cursor-pointer text-3xl text-white flex justify-center items-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl overflow-hidden border-2 border-white/20 hover:border-blue-400 transition-all transform hover:-translate-y-2 group`}
          onClick={() => {
            inputImgRef.current.click();
            setSelectedImg('input');
          }}
        >
          {!frontendImg && (
            <div className='flex flex-col items-center gap-2'>
              <RiImageAddFill className='group-hover:scale-110 transition-transform' />
              <p className='text-xs text-gray-300 text-center'>Upload Custom</p>
            </div>
          )}
          {frontendImg && <img src={frontendImg} className='h-full w-full object-cover' alt='custom' />}
          <input className='absolute -z-10 opacity-0' ref={inputImgRef} type='file' name='assistantImg' onChange={handleImg} accept='image/*' />
        </div>

        {/* Predefined Images */}
        {images.map((elem, key) => (
          <Card key={key} image={elem} />
        ))}
      </div>

      {/* Next Button */}
      <div className='flex gap-3 items-center justify-center mt-6'>
        <Link 
          to='/customize2' 
          className={`${!selectedImg ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl hover:-translate-y-1'} select bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl px-8 py-3 transition-all transform disabled:cursor-not-allowed`}
          onClick={(e) => !selectedImg && e.preventDefault()}
        >
          Next Step →
        </Link>
      </div>
    </div>
  )
}

export default Customize