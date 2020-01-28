import React, { Component } from "react";
import { connect } from "react-redux";

import Item from "../../components/Item/Item.component";
import { firestore } from "../../firebase/firebase.config";
import { setCart } from "../../redux/cart/cart.actions"


import "./Inventory.style.scss";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      platform: "All Platforms",
    };
  }

  async componentDidMount() {
    let ref = firestore.collection("inventory");

    let items = await ref.get()
    let docs = items.docs.map(doc=>doc.data())

    this.props.setInventory(docs)

    this.props.updateCart()
  }

  handleChange = event => {
    this.setState({ search: event.target.value.toLowerCase() });
  };

  handleClick = platform => {
    this.setState({ platform });
  };

  render() {
    const docs = this.props.inventory
    const items = docs.filter(item => {
      if (this.state.search === "") {
        if (this.state.platform === "All Platforms") {
          return item;
        } else {
          return item.platform === this.state.platform;
        }
      } else {
        if (this.state.platform === "All Platforms") {
          return item.name.includes(this.state.search);
        } else {
          return (
            item.name.includes(this.state.search) &&
            item.platform === this.state.platform
          );
        }
      }
    });
    return (
      <div className="wrapper">
        <div className="search-section">
          <span className="selected-platform">
            {this.state.platform}
          </span>
          <div className="platforms">
            <span
              className="platform all"
              onClick={() => this.handleClick("All Platforms")}
            >
              All Platforms
            </span>
            <span
              className="platform"
              onClick={() => this.handleClick("Playstation 4")}
            >
              Playstation 4
            </span>
            <span
              className="platform"
              onClick={() => this.handleClick("Xbox One")}
            >
              Xbox One
            </span>
            <span
              className="platform"
              onClick={() => this.handleClick("Nintendo Switch")}
            >
              Nintendo Switch
            </span>
          </div>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
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
    user: state.auth.currentUser
  };
}

function mapDispatch(dispatch){
  return {
    setInventory(payload){
      dispatch({type:"SET_INVENTORY",payload})
    },
    updateCart(){
      dispatch(setCart())
    },
  }
}

export default connect(mapState, mapDispatch)(Inventory);
