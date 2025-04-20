import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const LandingPage = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between '>
            <Navbar />
            <Hero />
        
        <footer>
           <h1 className='text-center'> &copy; Create By || Umayer Hossain</h1>
        </footer>
        </div>
    );
};

export default LandingPage;