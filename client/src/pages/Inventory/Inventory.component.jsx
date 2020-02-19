import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Components
import Item from "../../components/Item/Item.component";
import Platforms from "../../components/Platforms/Platforms.component";
// Redux actions
import { setCart } from "../../redux/cart/cart.actions";
import { updateInventory } from "../../redux/inventory/inventory.actions";

import "./Inventory.style.scss";

const Inventory = ({updateInventory, updateCart, inventory, search, platform}) => {

  useEffect(() => {
    updateInventory()
    updateCart()
  },[updateInventory, updateCart])

    const docs = inventory
    const items = docs.filter(item => {
      if (search === "") {
        if (platform === "All Platforms") {
          return item;
        } else {
          return item.platform === platform;
        }
      } else {
        if (platform === "All Platforms") {
          return item.name.includes(search);
        } else {
          return (
            item.name.includes(search) &&
            item.platform === platform
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

Inventory.propTypes = {
  inventory: PropTypes.array,
  search: PropTypes.string,
  platform: PropTypes.string,
  updateCart: PropTypes.func,
  updateInventory: PropTypes.func,
}

function mapState(state) {
  return { 
    inventory: state.inventory.inventory,
    search: state.inventory.search,
    platform: state.inventory.platform,
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
