import { firestore } from "../../firebase/firebase.config"

export const updateInventory = () => {
    return async (dispatch, getState) => {
        let ref = firestore.collection("inventory");
        let items = await ref.get()
        let docs = items.docs.map(doc=>doc.data())
    
        dispatch({type:"SET_INVENTORY", payload: docs})
    }
}

export const addItem = (item) => {
    return async (dispatch, getState) => {
        const ref = await firestore.collection("inventory").doc()
        item.id = ref.id;        
        await ref.set(item)
    
        dispatch(updateInventory())
    }
}

export const updateItem = (item) => {
    return async (dispatch, getState) => {
        const ref = firestore.collection("inventory").doc(item.id);
        await ref.update(item)
    
        dispatch({type:"UPDATE_ITEM", payload: item})
    }
}

export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        const ref = firestore.collection("inventory").doc(id);
        await ref.delete()
        
        dispatch({type:"DELETE_ITEM", payload: {id}})
    }
}