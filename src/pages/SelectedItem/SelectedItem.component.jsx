import React, { Component } from 'react';
import { connect } from "react-redux";

import './SelectedItem.style.scss';

class SelectedItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      disabled: true,
      id: this.props.match.params.id,
      name: this.props.inventory[this.props.match.params.id].name,
      price: this.props.inventory[this.props.match.params.id].price,
      platform: this.props.inventory[this.props.match.params.id].platform,
      quantity: this.props.inventory[this.props.match.params.id].quantity,
      image: this.props.inventory[this.props.match.params.id].image,
    }
  }

  handleChange=e=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUpdate=()=>{
    this.setState((prevState,prevProps)=>{
      return {disabled: !prevState.disabled}
    },()=>{
      console.log(this.state.disabled)
    })
  }

  handleDelete=()=>{
    this.props.onDeleteClick({id:this.state.id})
    this.props.history.push("/inventory")
  }

  handleInc=()=>{
    this.setState((prevState,prevProps)=>{
      return {
        quantity: prevState.quantity + 1
      }
    })
  }

  handleDec=()=>{
    this.setState((prevState,prevProps)=>{
      return {
        quantity: prevState.quantity - 1
      }
    })
  }

  render () {
    return (
      <div className='selected-item'>
        <div className='wrapper'>
          <img className='item-image' src={this.state.image} alt={this.state.name} />
          <div className='details'>
            <input
              name="name"
              type='text'
              className='item-name input'
              value={this.state.name}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            <input
            name="price"
              type='text'
              className='item-price input'
              value={this.state.disabled?`${this.state.price}$`:`${this.state.price}`}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            <input
            name="platform"
              type='text'
              className='item-platform input'
              value={this.state.platform}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            <div className='quantity-container'>
              <input className='btn plus' type='button' value='-' onClick={this.handleDec} disabled={this.state.disabled} />
              <span>
                {this.state.quantity}
              </span>
              <input className='btn minus' type='button' value='+' onClick={this.handleInc} disabled={this.state.disabled} />
            </div>
            <input className='btn update' type='button' value='Update item' onClick={this.handleUpdate} />
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