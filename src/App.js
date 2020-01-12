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

import { auth } from './firebase/firebase.config'

class App extends React.Component {
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.onAddUser(user)
      } else {
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
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={this.props.currentUser?Inventory:SignIn} />
            <Route path='/register' component={this.props.currentUser?Inventory:Register} />
            <Route exact path='/inventory' component={Inventory} />
            <Route path='/additem' component={AddItem} />
            <Route path='/inventory/:id' component={SelectedItem} />
            <Route path='/cart' component={Cart} />
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
  return { currentUser: state.auth.currentUser };
}

function mapDispatch (dispatch) {
  return {
    onAddUser (payload) {
      dispatch({ type: 'ADD_USER', payload })
    }
  }
}

export default connect(mapState, mapDispatch)(App)
