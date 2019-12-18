import React from "react";
import "./App.css";

import Inventory from "./components/inventory/Inventory.component";
import Navbar from "./components/Navbar/Navbar.component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>

      <main>
        <p>categories</p>
        <input id="search" name="search" type="text" placeholder="search" />
        <Inventory />
      </main>

      <footer>footer</footer>
    </div>
  );
}

export default App;
