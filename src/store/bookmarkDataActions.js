
import { redirect } from "react-router-dom";
import { app } from "../firebase/firebase.js";
import { entertainmentDataActions } from "./index.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export function getAllEntertainmentData() {
    return (dispatch) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userRef = doc(db, 'UserBookMrkData', user.uid);
                    const dataDoc = await getDoc(userRef);
                    if (dataDoc.exists()) {
                        const entertainmentData = dataDoc.data().entertainmentData;
                        // console.log(entertainmentData, '😘😘😘');
                        dispatch(entertainmentDataActions.getAllData(entertainmentData));
                    } else {
                        console.log("No bookmarked data found");
                    }
                } catch (error) {
                    console.error("Error fetching bookmarked data: ", error.message);
                }

            } else {
                redirect('/signup')
            }
        });
    };
}

export function updateBookmarkData(id) {
    return async (dispatch) => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'UserBookMrkData', user.uid);
        const docSnap = await getDoc(userRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          const entertainmentData = data.entertainmentData;
          const entertainmentIndex = entertainmentData.findIndex(el => el.id === id);
  
          if (entertainmentIndex !== -1) {
            const updatedEntertainmentData = [...entertainmentData];
            updatedEntertainmentData[entertainmentIndex] = {
              ...updatedEntertainmentData[entertainmentIndex],
              isBookmarked: !updatedEntertainmentData[entertainmentIndex].isBookmarked,
            };
  
            await updateDoc(userRef, {
              entertainmentData: updatedEntertainmentData,
            });
  
            // Optimistically update the state
            dispatch(entertainmentDataActions.getAllData(updatedEntertainmentData));
          }
        }
      }
    };
  }