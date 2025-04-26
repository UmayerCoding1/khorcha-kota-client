import React, { useEffect, useState, Suspense, lazy } from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';

// Lazy load heavy pages
const Dashboard = lazy(() => import('../page/Dashboard'));
const LandingPage = lazy(() => import('../page/LandingPage'));

const Root = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // less than 3s feels smoother
    return () => clearTimeout(timer); // clean up
  }, []);

  // if (loading) return <Loading />;

  return (
    <div className="font-poppins">
      <Suspense fallback={<Loading />}>
        {user ? <Dashboard /> : <LandingPage />}
      </Suspense>
    </div>
  );
};

export default Root;
