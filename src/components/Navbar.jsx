import React from 'react'
import Logo from '../assets/logo.png'
import {Link} from'react-router-dom'
function Navbar() {
  return (
    <div className='flex border-[3px] items-center space-x-10'>
      <img className='w-[90px]'src={Logo} alt="logo" />
      <Link to="/" className='text-blue-700 text-[18px]'>Home</Link>
      <Link to="/watchlist" className='text-blue-700 text-[18px]'>Watchlist</Link>
        
    </div>
  )
}

export default Navbar
