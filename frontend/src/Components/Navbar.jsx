import React from 'react'
import Logo from '../assets/Logo.png'

const Navbar = () => {
  return (
    <div>
        <nav className='p-4 px-12 flex justify-between'>
            <img src={Logo} alt='Logo' className='w-[60px]' />
            <ul className='flex'>
            <li className='mx-3'>Home</li>
            <li className='mx-3'>Shop</li>
            <li className='mx-3'>About</li>
            <li className='mx-3'>Contact</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar