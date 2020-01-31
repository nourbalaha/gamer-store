import { firestore } from "../../firebase/firebase.config"

export const updateInventory = () => {
    return async (dispatch, getState) => {
        let ref = firestore.collection("inventory");
        let items = await ref.get()
        let docs = items.docs.map(doc=>doc.data())
    
        dispatch({type:"SET_INVENTORY", payload: docs})
    }
}