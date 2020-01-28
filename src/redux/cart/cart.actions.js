import { firestore } from "../../firebase/firebase.config"
// import {store} from "../store"

export const setCart = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.currentUser.uid; 
        const cartRef = firestore.collection("users").doc(uid).collection("cart")
        const cartSnap = await cartRef.get()
        let result = cartSnap.docs
        .map(doc=>doc.data())
        const obj ={}
        result.forEach(doc=>obj[doc.id]=doc)
        dispatch({
            type: "SET_CART",
            payload: obj,
        })
    }
}