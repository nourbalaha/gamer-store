import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
            <Route exact path="/" component={Inventory} />>
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
