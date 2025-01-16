import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between py-1 px-3 bg-purple-900 text-white items-center'>
        <div className="logo">
            <span className='font-bold text-2xl'> Itask </span>
        </div>
        <ul className="flex gap-2">
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>Pending</li>
        </ul>
    </nav>
  )
}

export default Navbar
