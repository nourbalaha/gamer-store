import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import Inventory from "./pages/Inventory/Inventory.component";
import SelectedItem from "./pages/SelectedItem/SelectedItem.component"
import AddItem from "./pages/AddItem/AddItem.component"
import Home from "./pages/Home/Home.component"

import Navbar from "./components/Navbar/Navbar.component";
import Footer from "./components/Footer/Footer.component";

import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inventory" component={Inventory} />
            <Route path="/additem" component={AddItem} />
            <Route path="/inventory/:id" component={SelectedItem} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
