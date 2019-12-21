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
        <img className='item-image' src={item.image} alt={item.name} />
        <div className='details'>
          <h2 className='item-name'>
            {item.name}
          </h2>
          <p className='item-price'>
            {item.price}$
          </p>
          <p className='item-platform'>
            {item.platform}
          </p>
        </div>
      </div>
    )
  }
}
