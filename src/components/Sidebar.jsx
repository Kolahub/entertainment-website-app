import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";
import { doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import personIcon from '../assets/person-square.svg';
import { useDispatch, useSelector } from "react-redux";
import { entertainmentDataActions } from '../store';

function Sidebar() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const imgUrl = useSelector(state => state.imgUrl);
  const [clickTimeout, setClickTimeout] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'UserBookMrkData', user.uid);
        return onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            dispatch(entertainmentDataActions.updateImg(snapshot.data().imgUrl));
          }
        });
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [dispatch, db, auth]);

  async function handleLogout() {
    await signOut(auth);
    navigate('/signup');
  }

  async function handleImgChange(e) {
    const userAuth = auth.currentUser;
    const userRef = doc(db, "UserBookMrkData", userAuth.uid);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (event) {
        document.getElementById("profileImage").src = event.target.result;
        await updateDoc(userRef, {
          imgUrl: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleClick() {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleLogout();
    } else {
      setClickTimeout(setTimeout(() => {
        inputRef.current.click();
        setClickTimeout(null);
      }, 250));
    }
  }

  return (
    <aside className="h-full">
      <div className="w-full lg:h-screen sm:p-6 lg:p-8">
        <div className="h-full flex flex-row lg:flex-col gap-14 justify-between lg:justify-normal items-center bg-semiDarkBlue sm:rounded-xl px-8 lg:px-0 py-8 w-full lg:w-24">
          <img src={logo} alt="Logo" className="" />
          <div className="flex flex-row lg:flex-col gap-8 items-center">
            <NavLink
              to={"/"}
              end
              className={({ isActive }) =>
                isActive
                  ? "fill-white"
                  : "hover:fill-customRed fill-greyishBlue"
              }
            >
              <svg
                width="20"
                height="20"
                className="transition-colors"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" />
              </svg>
            </NavLink>

            <NavLink
              to={"/movies"}
              className={({ isActive }) =>
                isActive
                  ? "fill-white"
                  : "hover:fill-customRed fill-greyishBlue"
              }
            >
              <svg
                width="20"
                height="20"
                className="transition-colors"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.956 0H3.044A3.044 3.044 0 0 0 0 3.044v13.912A3.044 3.044 0 0 0 3.044 20h13.912A3.044 3.044 0 0 0 20 16.956V3.044A3.044 3.044 0 0 0 16.956 0ZM4 9H2V7h2v2Zm-2 2h2v2H2v-2Zm16-2h-2V7h2v2Zm-2 2h2v2h-2v-2Zm2-8.26V4h-2V2h1.26a.74.74 0 0 1 .74.74ZM2.74 2H4v2H2V2.74A.74.74 0 0 1 2.74 2ZM2 17.26V16h2v2H2.74a.74.74 0 0 1-.74-.74Zm16 0a.74.74 0 0 1-.74.74H16v-2h2v1.26Z" />
              </svg>
            </NavLink>

            <NavLink
              to={"/series"}
              className={({ isActive }) =>
                isActive
                  ? "fill-white"
                  : "hover:fill-customRed fill-greyishBlue"
              }
            >
              <svg
                width="20"
                height="20"
                className="transition-colors"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4.481H9.08l2.7-3.278L10.22 0 7 3.909 3.78.029 2.22 1.203l2.7 3.278H0V20h20V4.481Zm-8 13.58H2V6.42h10v11.64Zm5-3.88h-2v-1.94h2v1.94Zm0-3.88h-2V8.36h2v1.94Z" />
              </svg>
            </NavLink>

            <NavLink
              to={"/bookmark"}
              className={({ isActive }) =>
                isActive
                  ? "fill-white"
                  : "hover:fill-customRed fill-greyishBlue"
              }
            >
              <svg
                width="17"
                height="20"
                className="transition-colors"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.387 0c.202 0 .396.04.581.119.291.115.522.295.694.542.172.247.258.52.258.82v17.038c0 .3-.086.573-.258.82a1.49 1.49 0 0 1-.694.542 1.49 1.49 0 0 1-.581.106c-.423 0-.79-.141-1.098-.423L8.46 13.959l-5.83 5.605c-.317.29-.682.436-1.097.436-.202 0-.396-.04-.581-.119a1.49 1.49 0 0 1-.694-.542A1.402 1.402 0 0 1 0 18.52V1.481c0-.3.086-.573.258-.82A1.49 1.49 0 0 1 .952.119C1.137.039 1.33 0 1.533 0h13.854Z" />
              </svg>
            </NavLink>
          </div>

          <button
            className="lg:mt-auto object-cover h-10 w-10 rounded-full"
            onClick={handleClick}
          >
            <img
              id="profileImage"
              src={imgUrl || personIcon}
              alt="Profile"
              className="h-full w-full rounded-full"
            />
          </button>
          <input
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleImgChange}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
