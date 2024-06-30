import { bookmarkActions } from ".";
import { app } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

const auth = getAuth(app)
const db = getFirestore(app)

export function fetchAllBookmark (data) {
    return async (dispatch) => {
        try {
            const res = await  
        } catch(error) {
            console.log(error.message);
        }
    }
}