import React from 'react'
import { connect } from "react-redux" 

import "./FlashMsg.style.scss"

const FlashMsg = ({ id, type, msg, deleteMsg }) => {
    const handleClose = () => {
        deleteMsg({ id })
    }

    // Remove Message after 3 sec.
    setTimeout(()=>{
        deleteMsg({ id })
    },3000)

    return (
        <div className={`msg-container ${type}`}>
            <span className="msg">{msg}</span>
            <span className="msg-close" onClick={handleClose}>&times;</span>
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        deleteMsg(payload){
            dispatch({ type: "DELETE_MSG", payload })
        }
    }
}

export default connect(null, mapDispatch)(FlashMsg);

