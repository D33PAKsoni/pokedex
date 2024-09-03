import React, { useState, useEffect } from "react";
import PokemonCardGenerator from "./components/PokemonCardGenerator/PokemonCardGenerator.jsx";
import SearchPokemon from "./components/SearchPokemon/SearchPokemon.jsx";
import "./App.css";

function App() {
  return (
    <>
      <main>
       <div className="head container">
        <img src="https://cdn.freebiesupply.com/images/large/2x/pokemon-logo-transparent.png"></img>
      </div>
      <SearchPokemon />

      <PokemonCardGenerator />
      </main>
      <footer>
        <p>This is an assignment project build by <strong>Deepak Kumar Soni</strong> for internship at TheGoodGame Theory.</p>
      </footer>
    </>
  );
}

export default App;
