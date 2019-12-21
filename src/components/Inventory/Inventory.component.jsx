import React, { Component } from 'react'

import Item from '../Item/Item.component'

import inventory from '../../data/inventory'

import '../Inventory/Inventory.style.scss'

export default class Inventory extends Component {
  render () {
    return (
      <div className="wrapper">
        <p>platform</p>
        <input id='search' name='search' type='text' placeholder='search' />
        <div className='inventory'>
          {inventory.map(item =>
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
              platform={item.platform}
            />
          )}
        </div>
      </div>
    )
  }
}
