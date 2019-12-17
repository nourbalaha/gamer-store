import React, { Component } from 'react'

import Item from "../Item/Item.component"

import inventory from "../../data/inventory"

export default class Inventory extends Component {
    render() {
        return (
            <div className="inventory">
                {
                    inventory.map(item => <Item />)
                }
            <Item />
          </div>
        )
    }
}
