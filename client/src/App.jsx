import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/loginButton';
import NavBar from './components/NavBar';

export default function App() {
  const [title, setTitle] = useState('Static Data');
  const { isLoading, error } = useAuth0();
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_SERVER}`).then((res) => {
      setTimeout(() => {
        const { data } = res;
        setTitle(`API Response: ${data.data}`);
      }, 1500);
    });
  }, []);

  return (
    <div className="bg-slate-800 w-screen h-screen flex justify-center items-center flex-col">
      <NavBar />
      <h1 className="text-5xl text-white font-bold w-100 text-center">
        {title}
      </h1>
      {error && <h1>Authentication Error</h1>}
      {!error && isLoading && <h1>Loading . . . </h1>}
      {!isLoading && <LoginButton />}
    </div>
  );
}
