import React, { Component } from "react";
import { connect } from "react-redux";
// Components
import Item from "../../components/Item/Item.component";
import Platforms from "../../components/Platforms/Platforms.component";
// Redux actions
import { setCart } from "../../redux/cart/cart.actions";
import { updateInventory } from "../../redux/inventory/inventory.actions";


import "./Inventory.style.scss";

class Inventory extends Component {

  componentDidMount() {
    this.props.updateInventory()
    this.props.updateCart()
  }

  render() {
    const docs = this.props.inventory
    const items = docs.filter(item => {
      if (this.props.search === "") {
        if (this.props.platform === "All Platforms") {
          return item;
        } else {
          return item.platform === this.props.platform;
        }
      } else {
        if (this.props.platform === "All Platforms") {
          return item.name.includes(this.props.search);
        } else {
          return (
            item.name.includes(this.props.search) &&
            item.platform === this.props.platform
          );
        }
      }
    });
    return (
      <div className="wrapper">
        <Platforms />
        <div className="inventory">
          {items.map(item =>
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
    );
  }
}

function mapState(state) {
  return { 
    inventory: state.inventory.inventory,
    search: state.inventory.search,
    platform: state.inventory.platform,
    user: state.auth.currentUser
  };
}

function mapDispatch(dispatch){
  return {
    updateCart(){
      dispatch(setCart())
    },
    updateInventory(){
      dispatch(updateInventory())
    },
  }
}

export default connect(mapState, mapDispatch)(Inventory);
