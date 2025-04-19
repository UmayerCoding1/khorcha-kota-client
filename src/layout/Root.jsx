import React from 'react';
import Dashboard from '../page/Dashboard';
import LandingPage from '../page/LandingPage';

const Root = () => {
    const user = false
    return (
        <div className=''>
            {user ? <Dashboard /> : <LandingPage />}
        </div>
    );
};

export default Root;