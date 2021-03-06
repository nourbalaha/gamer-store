import { firestore } from "../../firebase/firebase.config"

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

export const addItem = (item) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.currentUser.uid; 
        const ref = await firestore.collection("users").doc(uid).collection("cart").doc(item.id).get()
        
        if(ref.exists){
            const newItem = ref.data()
            newItem.quantity = newItem.quantity + 1
            await firestore.collection("users").doc(uid).collection("cart").doc(item.id).update(newItem)
    
        } else {
            item.quantity = 1
            await firestore.collection("users").doc(uid).collection("cart").doc(item.id).set(item)
        }

        dispatch({
            type: "ADD_TO_CART",
            payload: item,
        })
    }
}

export const removeItem = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.currentUser.uid; 
        const ref = firestore.collection("users").doc(uid).collection("cart").doc(id)
        await ref.delete()
        dispatch({
            type: "REMOVE_ITEM",
            payload: {id},
        })
    }
}