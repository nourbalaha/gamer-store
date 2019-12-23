import React, { Component } from 'react';
import { connect } from "react-redux";

import './SelectedItem.style.scss';

class SelectedItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: this.props.match.params.id
    }
  }

  handleDelete=()=>{
    this.props.onDeleteClick({id:this.state.id})
    this.props.history.push("/inventory")
  }

  render () {
    let item = this.props.inventory.filter(item=>{
      if(Number(item.id)===Number(this.state.id)){
        return true;
      }
      return false;
    })[0]


    return (
      <div className='selected-item'>
        <div className='wrapper'>
          <img className='item-image' src={item.image} alt={item.name} />
          <div className='details'>
            <input
              type='text'
              className='item-name input'
              value={item.name}
              disabled
            />
            <input
              type='text'
              className='item-price input'
              value={`${item.price}$`}
              disabled
            />
            <input
              type='text'
              className='item-platform input'
              value={item.platform}
              disabled
            />
            <div className='quantity-container'>
              <input className='btn plus' type='button' value='-' />
              <span>
                {item.quantity}
              </span>
              <input className='btn minus' type='button' value='+' />
            </div>
            <input className='btn update' type='button' value='Update item' />
            <input className='btn delete' type='button' value='Delete item' onClick={this.handleDelete} />
          </div>
        </div>
      </div>
    )
  }
}

function mapState(state){
  return {
    inventory: state.inventory
  }
}

function mapDispatch(dispatch){
  return {
    onUpdateClick(payload){
      dispatch({type:"UPDATE_ITEM", payload})
    },
    onDeleteClick(payload){
      dispatch({type:"DELETE_ITEM", payload})
    },
  }
}

export default connect(mapState,mapDispatch)(SelectedItem);