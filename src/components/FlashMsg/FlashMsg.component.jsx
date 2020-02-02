import React, { Component } from 'react'
import { connect } from "react-redux" 

import "./FlashMsg.style.scss"

class FlashMsg extends Component {
    handleClose=()=>{
        this.props.deleteMsg({id: this.props.id})
    }
    render() {
        // Remove Message after 3 sec.
        setTimeout(()=>{
            this.props.deleteMsg({id: this.props.id})
        },3000)

        return (
            <div className={`msg-container ${this.props.type}`}>
                <span className="msg">{this.props.msg}</span>
                <span className="msg-close" onClick={this.handleClose}>&times;</span>
            </div>
        )
    }
}

const mapState = state => {
    return {
        flash: state.flash.messages,
    }
}

const mapDispatch = dispatch => {
    return {
        deleteMsg(payload){
            dispatch({type: "DELETE_MSG", payload })
        }
    }
}

export default connect(mapState, mapDispatch)(FlashMsg);

