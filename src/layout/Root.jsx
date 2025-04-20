import React from 'react';
import Dashboard from '../page/Dashboard';
import LandingPage from '../page/LandingPage';
import useAuth from '../hooks/useAuth';

const Root = () => {
    const {user} = useAuth();
    return (
        <div className='font-poppins'>
            {user ?<>
                <Dashboard />
            </> : <LandingPage />}

            
        </div>
    );
};

export default Root;