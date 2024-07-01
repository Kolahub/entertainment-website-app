import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase';

const useAuthProtection = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/signup');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);
};

export default useAuthProtection;
