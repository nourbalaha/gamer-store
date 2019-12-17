import React from 'react';
import './App.css';

import Inventory from "./components/inventory/Inventory.component"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>logo</p>
        <nav>
          <ul>
          <li><a href="#">view inventory</a></li>
          <li><a href="#">add item</a></li>
          </ul>
        </nav>
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
