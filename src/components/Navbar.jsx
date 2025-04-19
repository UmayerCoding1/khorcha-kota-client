import React from 'react';
import Logo from './Logo';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-4 bg-white shadow-md rounded-lg'>
            <Logo />

            <button className='p-2 px-6 bg-primary rounded-xl text-white font-semibold cursor-pointer'>Create account</button>
        </nav >
    );
};

export default Navbar;