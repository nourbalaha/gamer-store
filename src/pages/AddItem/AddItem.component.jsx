import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/inventory/inventory.actions"
import "./AddItem.style.scss";

import GameCover from "../../assets/Game Cover Placeholder.jpg"

const AddItem = ({ admin, history, addFlashMsg, addItem }) => {

  const [item, setItem] = useState({
    id: "",
    name: "",
    platform: "",
    price: "",
    image: "",
    quantity: ""
  })

  useEffect(()=>{
    if(!admin){
      history.push("/inventory")
    }
  },[admin, history])

  const handleSubmit = async event => {
    event.preventDefault();
    
    const newItem = item;
    newItem.name = newItem.name.toLowerCase();
    if(!item.image) newItem.image=GameCover;
    newItem.price=Number(newItem.price)
    newItem.quantity=Number(newItem.quantity)

    await addItem(newItem)

    addFlashMsg({msg:"Item Added Successfully!", type:"success"})

    history.push("/inventory")
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setItem({ 
      ...item,
      [name]: value 
    });
  };

    return (
      <div className="add-item">
        <form className="add-item-form" onSubmit={handleSubmit}>
          <span className="title">Add Item</span>

          <input
            className="input"
            name="name"
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={handleChange}
            required
            />

          <select
              className="list"
              name="platform"
              value={item.platform}
              placeholder="Platform"
              onChange={handleChange}
              required
            >
              <option value="">--Please choose a platform--</option>
              <option value="Playstation 4">Playstation 4</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>

          <input
            className="input"
            name="price"
            type="text"
            placeholder="Price"
            value={item.price}
            onChange={handleChange}
            required
          />

            <input
            className="input"
            name="image"
            type="text"
            placeholder="Image Url"
            value={item.image}
            onChange={handleChange}
            />

          <input
            className="input"
            name="quantity"
            type="text"
            placeholder="Quantity"
            value={item.quantity}
            onChange={handleChange}
          />

          <input className="btn" type="submit" value="Add" />
        </form>
      </div>
    );
  }

function mapState(state) {
  return { 
    admin: state.admin.admin,
  };
}

function mapDispatch(dispatch) {
  return {
    addItem(payload) {
      dispatch(addItem(payload));
    },
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    },
  };
}

export default connect(mapState, mapDispatch)(AddItem);
