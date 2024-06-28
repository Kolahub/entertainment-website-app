import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const useAuthForm = (isSignUp = false) => {
  const TIMEROUT = 4000;
  const auth = getAuth(app);
  const db = getFirestore(app)
  const navigate = useNavigate();

  const [error, setError] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    errMsg: '',
    loading: false,
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    repeatPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError((prev) => ({
      ...prev,
      loading: true,
    }));
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    for (const [key, value] of Object.entries(data)) {
      if (!value) {
        setError((prev) => ({
          ...prev,
          loading: false,
          [key]: true,
        }));
        return;
      }
    }

    if (isSignUp && data.password !== data.repeatPassword) {
      setError((prev) => ({
        ...prev,
        loading: false,
        errMsg: 'Password does not match',
      }));
      return;
    }

    try {
      const res = isSignUp
        ? await createUserWithEmailAndPassword(auth, data.email, data.password)
        : await signInWithEmailAndPassword(auth, data.email, data.password);
        if(isSignUp) {
            const user = res.user
            const userRef = doc(db, 'UserBookMrkData', user.uid)
            setDoc(userRef, {
                bookmark: [],
                imgUrl: ''
            })
        }
      setError((prev) => ({
        ...prev,
        loading: false,
      }));
      e.target.reset();
      return res;
    } catch (err) {
      setError((prev) => ({
        ...prev,
        loading: false,
        errMsg: err.message.replace('Firebase:', ''),
      }));
      console.log(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      }
    });

    for (const [key, value] of Object.entries(error)) {
      if (value) {
        setTimeout(() => {
          setError((prev) => ({
            ...prev,
            [key]: false,
          }));
        }, TIMEROUT);
      }
    }

    return () => unsubscribe();
  }, [error, auth, navigate]);

  return { error, handleSubmit, passwordVisibility, togglePasswordVisibility };
};

export default useAuthForm;
