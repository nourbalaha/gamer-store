import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions"
import { updateItem, deleteItem } from "../../redux/inventory/inventory.actions"

import "./SelectedItem.style.scss";

const SelectedItem = ({ inventory, match, history, updateItem, deleteItem, addFlashMsg, addToCart, admin }) => {

  const [item, setItem] = useState({
    disabled: true,
    id: "",
    name: "",
    price: "",
    platform: "",
    quantity: "",
    image: ""
  })

  useEffect(()=>{
    const id = match.params.id;
    const currentItem = inventory.filter(
      arrItem => arrItem.id === id
      )[0];
      setItem({
        ...item,
        id,
        name: currentItem.name,
        price: currentItem.price,
        platform: currentItem.platform,
        quantity: currentItem.quantity,
        image: currentItem.image
      });
      // eslint-disable-next-line
  },[inventory])

  const handleChange = event => {
    const { name, value } = event.target;
    setItem({
      ...item,
      [name]: value
    });
  };

  const handleUpdate = () => {
    setItem({
      ...item,
      disabled: !item.disabled,
    });

    if (!item.disabled) {
      const updatedItem = {
        id: item.id,
        name: item.name.toLocaleLowerCase(),
        price: item.price,
        platform: item.platform,
        quantity: item.quantity,
        image: item.image
      }

      updateItem(updatedItem)

      addFlashMsg({msg:"Item Updated Successfully!", type:"success"})
      
      history.push("/inventory");
    }
  };
  
  const handleDelete = () => {
    deleteItem(match.params.id)

    addFlashMsg({msg:"Item Deleted Successfully!", type:"success"})

    history.push("/inventory");
  };

  const handleInc = () => {
    setItem({
        ...item,
        quantity: item.quantity + 1
      });
  };

  const handleDec = () => {
    if (item.quantity > 0) {
      setItem({
        ...item,
          quantity: item.quantity - 1
        })
    }
  };

  const handleAddToCart = () => {
    if(item.quantity > 0){
      const newItem = {};
      newItem.id = item.id;
      newItem.name = item.name;
      newItem.price = item.price;
      newItem.platform = item.platform;
      newItem.image = item.image;
  
      addToCart(newItem)
  
      addFlashMsg({msg:"Item Added To Cart Successfully!", type:"success"})
    } else {
      addFlashMsg({msg:"Item not available in the inventory", type:"error"})
    }

  };

    return (
      <div className="selected-item">
        <div className="wrapper">
          <img
            className="item-image"
            src={item.image}
            alt={item.name}
          />
          <div className="details">
            <input
              name="name"
              type="text"
              className="item-name input"
              value={item.name.length>25?item.name.slice(0,25)+"...":item.name}
              onChange={handleChange}
              disabled={item.disabled}
            />
            <input
              name="price"
              type="text"
              className="item-price input"
              value={
                item.disabled
                  ? `${item.price}$`
                  : `${item.price}`
              }
              onChange={handleChange}
              disabled={item.disabled}
            />

            {admin
            ?
            (<select
              className="input"
              name="platform"
              value={item.platform}
              onChange={handleChange}
              disabled={item.disabled}
            >
              <option value="Playstation 4">Playstation 4</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>)
            :
            <p className="input">{item.platform}</p>
            }

            {admin
            ?
            (<div className="quantity-container">
              <button
                className="btn plus-minus"
                onClick={handleDec}
                disabled={item.disabled}
              >-</button>
              <span>
                {item.quantity}
              </span>
              <button
                className="btn plus-minus"
                onClick={handleInc}
                disabled={item.disabled}
              >+</button>
            </div>)
            :
            ""
            }
            {admin
            ?
            (<button
              className="btn update"
              onClick={handleUpdate}
            ><i className="fa fa-pencil" /> Update item</button>)
          :
          ""
          }
            {admin?
            (<button
              className="btn delete"
              onClick={handleDelete}
            ><i className="fa fa-trash" /> Delete item</button>)
          :
          ""
          }

            {!admin
            ?
            (<button
              className="btn add-to-cart"
              onClick={handleAddToCart}
            ><i className="fa fa-shopping-bag" /> Add to cart</button>)
          :
          ""}
          </div>
        </div>
      </div>
    );
  }

function mapState(state) {
  return {
    inventory: state.inventory.inventory,
    admin: state.admin.admin,
  };
}

function mapDispatch(dispatch) {
  return {
    addToCart(payload) {
      dispatch(addItem(payload));
    },
    updateItem(payload) {
      dispatch(updateItem(payload));
    },
    deleteItem(payload) {
      dispatch(deleteItem(payload));
    },
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    },
  };
}

export default connect(mapState, mapDispatch)(SelectedItem);
