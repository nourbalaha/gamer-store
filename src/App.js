import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

import Inventory from "./components/Inventory/Inventory.component";
import Navbar from "./components/Navbar/Navbar.component";
import SelectedItem from "./components/SelectedItem/SelectedItem.component"
import Footer from "./components/Footer/Footer.component"

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>

        <main>
          <Switch>
            <Route exact path="/">
              <p>platform</p>
              <input
                id="search"
                name="search"
                type="text"
                placeholder="search"
              />
              <Inventory />
            </Route>
            <Route path="/:id" component={SelectedItem} />
          </Switch>
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
