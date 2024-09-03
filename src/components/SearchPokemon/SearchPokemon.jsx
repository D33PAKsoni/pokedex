import React, { useState } from "react";
import axios from "axios";
import "./SearchPokemon.css";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 20, // max tilt rotation (degrees)
  perspective: 1500, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.5, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

function SearchPokemon() {
  const [searchQuery, setSearchQuery] = useState(""); //To search pokemon using name
  const [pokemonData, setPokemonData] = useState({}); //To store single pokemon data

  const [searchBox, setSearchBox] = useState("hidden");

  function handleSearch(e) {
    e.preventDefault();

    axios //Fetches data from api and stores in pokemon state variable
      .get(`https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`)
      .then((res) => {
        setPokemonData(res.data);
        if (searchQuery) { //To control searh box visibility
          setSearchBox("visible");
        } else {
          setSearchBox("hidden");
        }
      });
    console.log(pokemonData);
    console.log(pokemonData.id);
  }
  return (
    <section>
      <div>
        <div className="search container">
          <form className="searchbar" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pokémon by name"
            />
            <div>
              {" "}
              <button className="button" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <div className={`searchbox ${searchBox}`}>
          <h3>Search Result</h3>
          <div className={`cards container`}>
            <Tilt options={defaultOptions}>
              <div className="card">
                <div className="cardbg"></div>
                <div className="cardimg">
                  <Tilt options={defaultOptions}>
                    {" "}
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
                      alt={searchQuery}
                    ></img>
                  </Tilt>
                </div>
                <div className="cardname">
                  <Tilt options={defaultOptions}>
                    <p>
                      {searchQuery.charAt(0).toUpperCase() +
                        searchQuery.slice(1)}
                    </p>  
                    {/* To capitalize the first letter */}
                  </Tilt>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchPokemon;
