import React, { Component } from 'react'

import './SelectedItem.style.scss'

import inventory from '../../data/inventory'

export default class SelectedItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: inventory,
      id: this.props.match.params.id
    }
  }

  render () {
    const item = this.state.items[this.state.id - 1]
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
            <input className='btn delete' type='button' value='Delete item' />
          </div>
        </div>
      </div>
    )
  }
}
