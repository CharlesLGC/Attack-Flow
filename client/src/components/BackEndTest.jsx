// import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Spinner from './PDFAnnotator/Spinner';

const BackEndTest = () => {
  const [title, setTitle] = useState('');
  const { isAuthenticated, getAccessTokenSilently, isLoading, logout } =
    useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    async function authCheck() {
      try {
        const accessToken = await getAccessTokenSilently();
        await axios.get(`${import.meta.env.VITE_APP_SERVER}/verify`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTitle('Login Successful! Redirecting...');
        setTimeout(() => {
          navigate('/projects');
        }, 1500);
      } catch (error) {
        setTitle('An error has occurred, please login again.');
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
    if (!isLoading) authCheck();
  }, [getAccessTokenSilently, navigate, isAuthenticated, isLoading, logout]);
  return (
    <div>
      <NavBar currentRoute="/backTest" />
      <div className="w-full h-screen flex items-center justify-center text-3xl font-bold">
        {isLoading ? <Spinner /> : title}
      </div>
    </div>
  );
};

export default BackEndTest;
