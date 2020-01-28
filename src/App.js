import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import Inventory from './pages/Inventory/Inventory.component'
import SelectedItem from './pages/SelectedItem/SelectedItem.component'
import AddItem from './pages/AddItem/AddItem.component'
import Home from './pages/Home/Home.component'
import SignIn from './pages/SignIn/SignIn.component'
import Register from './pages/Register/Register.component'
import Cart from './pages/Cart/Cart.component'

import Navbar from './components/Navbar/Navbar.component'
import Footer from './components/Footer/Footer.component'

import { auth, firestore } from './firebase/firebase.config'
import { setCart } from "./redux/cart/cart.actions.js"

class App extends React.Component {
  componentDidMount () {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = firestore.collection("users").doc(user.uid)
        const userSnap = await userRef.get()
        // if it is a new user create user data
        if(!userSnap.exists){
          const data = {}
          data.Email = user.email;
          data.Name = user.displayName;
          data.Role = "user"
          await userRef.set(data);
        }
        // set user
        this.props.onAddUser(user)
        //sync with firebase's cart
        this.props.updateCart()
        
        const adminRef = firestore.collection("users").doc(user.uid)
        const adminSnap = await adminRef.get()
        if(adminSnap.data().Role==="admin"){
          this.props.setAdmin()
        } else {
          this.props.setUser()
        }

      } else {
        this.props.setCart({})
        this.props.onAddUser(null)
      }
    })
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Navbar />
        </header>

        <main>
          <Switch>
            <Route exact path='/' component={this.props.currentUser?Inventory:Home} />
            <Route path='/signin' component={this.props.currentUser?Inventory:SignIn} />
            <Route path='/register' component={this.props.currentUser?Inventory:Register} />
            <Route exact path='/inventory' component={this.props.currentUser?Inventory:Home} />
            <Route path='/additem' component={this.props.currentUser?AddItem:Home} />
            <Route path='/inventory/:id' component={this.props.currentUser?SelectedItem:Home} />
            <Route path='/cart' component={this.props.currentUser?Cart:Home} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser,
  };
}

function mapDispatch (dispatch) {
  return {
    onAddUser (payload) {
      dispatch({ type: 'ADD_USER', payload })
    },
    setCart(payload){
      dispatch({type:"SET_CART",payload})
    },
    setAdmin(){
      dispatch({type:"SET_ADMIN"})
    },
    setUser(){
      dispatch({type:"SET_USER"})
    },
    updateCart(){
      dispatch(setCart())
    },
  }
}

export default connect(mapState, mapDispatch)(App)
