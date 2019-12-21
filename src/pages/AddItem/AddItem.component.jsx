import React, { Component } from 'react'

import './AddItem.style.scss'

export default class AddItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id:"",
            name:"",
            platform:"",
            price: "",
            image: "",
            quantity: ""
        }
    }
    
    handleSubmit=()=>{

    }
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
  render () {
    return (
      <div className='add-item'>
        <form className="add-item-form" onSubmit={this.handleSubmit}>
          <span className="title">Add Item</span>
            <input
            className="input"
            name="id"
            type='text'
            placeholder="ID"
            value={this.state.id}
            onChange={this.handleChange}
            />

            <input
            className="input"
            name="name"
            type='text'
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            />
        
            <input
            className="input"
            name="platform"
            type='text'
            placeholder="Platform"
            value={this.state.platform}
            onChange={this.handleChange}
            />
          
            <input
            className="input"
            name="price"
            type='text'
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
            />
          
            <input
            className="input"
            name="image"
            type='text'
            placeholder="Image Url"
            value={this.state.image}
            onChange={this.handleChange}
            />
          
            <input
             className="input"
             name="quantiny"
             type='text'
             placeholder="Quantity"
            value={this.state.quantiny}
            onChange={this.handleChange}
            />
          
          <input className="btn" type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}
