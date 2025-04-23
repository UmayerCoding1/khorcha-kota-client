import React, { useState } from 'react';
import Dashboard from '../page/Dashboard';
import LandingPage from '../page/LandingPage';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';

const Root = () => {
    const [loading,setLoading] = useState(true);
    const {user} = useAuth();

    setTimeout(() => setLoading(false),3000);

    
    return (
        <div className='font-poppins'>
          {loading ? <Loading/> : <>
            {user ?<>
                <Dashboard />
            </> : <LandingPage />}
          </>}

        </div>
    );
};

export default Root;