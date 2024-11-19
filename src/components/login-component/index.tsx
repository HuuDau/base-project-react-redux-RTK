import React from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setToken } from '@/redux-query/services/authSlice';

const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
  
    const token = 'your-access-token'; // call api get token
    dispatch(setToken(token)); 
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginComponent;