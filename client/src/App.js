import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// CSS
import './App.css'
// Pages
import Inventory from './pages/Inventory/Inventory.component'
import SelectedItem from './pages/SelectedItem/SelectedItem.component'
import AddItem from './pages/AddItem/AddItem.component'
import Home from './pages/Home/Home.component'
import SignIn from './pages/SignIn/SignIn.component'
import Register from './pages/Register/Register.component'
import Cart from './pages/Cart/Cart.component'
import Checkout from "./pages/Checkout/Checkout.component"
// Components
import Navbar from './components/Navbar/Navbar.component'
import Footer from './components/Footer/Footer.component'
import FlashMsg from "./components/FlashMsg/FlashMsg.component"
// Firebase
import { auth, firestore } from './firebase/firebase.config'
// Redux
import { setCart } from "./redux/cart/cart.actions.js"

const App = ({ onAddUser, updateCart, addFlashMsg, setAdmin, setUser, setCart, currentUser, messages }) => {

  useEffect(() => {
    let unsubscribeFromAuth = null;
    
    unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
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
          addFlashMsg({msg:"User Registration Successful!", type: "success"})
  
        }
        // set user
        onAddUser(user)
        //sync with firebase's cart
        updateCart()
        
        const adminRef = firestore.collection("users").doc(user.uid)
        const adminSnap = await adminRef.get()
        if(adminSnap.data().Role==="admin"){
          setAdmin()
        } else {
          setUser()
        }
  
      } else {
        setCart({})
        onAddUser(null)
      }
    })

    return (() => {
      unsubscribeFromAuth();
    })

  },[addFlashMsg, onAddUser, setAdmin, setCart, setUser, updateCart])

  return (
    <div className='App'>
      <header className='App-header'>
        <Navbar />
        <div className="flash-msg-container">
        {
        messages.length>0 && messages.map(msg=>
        <FlashMsg key={msg.id} id={msg.id} msg={msg.msg} type={msg.type} />
        )
        }
        </div>
      </header>

      <main>
        <Switch>
          <Route exact path='/' component={currentUser?Inventory:Home} />
          <Route path='/signin' component={currentUser?Inventory:SignIn} />
          <Route path='/register' component={currentUser?Inventory:Register} />
          <Route exact path='/inventory' component={currentUser?Inventory:Home} />
          <Route path='/additem' component={currentUser?AddItem:Home} />
          <Route path='/inventory/:id' component={currentUser?SelectedItem:Home} />
          <Route path='/cart' component={currentUser?Cart:Home} />
          <Route path='/checkout' component={currentUser?Checkout:Home} />
        </Switch>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser,
    messages: state.flash.messages,
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
    addFlashMsg(payload){
      dispatch({type:"ADD_MSG", payload})
    }
  }
}

export default connect(mapState, mapDispatch)(App)
