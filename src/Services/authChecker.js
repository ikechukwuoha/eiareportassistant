import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/slices/authSlice';

// This component checks if the user is authenticated on app load
export const AuthChecker = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // On mount, check if the user is authenticated
    dispatch(fetchUser());
  }, [dispatch]);
  
  return null; // This component doesn't render anything
};