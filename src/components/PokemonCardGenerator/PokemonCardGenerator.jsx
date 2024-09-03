import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./PokemonCardGenerator.css";
import { Tilt } from "react-tilt";

//Using react tilt to provide Parallax effect to card

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

function PokemonCardGenerator() {
  const [pokemon, setPokemon] = useState([]); //Array of pokemon names
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=8"
  ); //Sets api used for fetching data
  const [nextPageUrl, setNextPageUrl] = useState(); // USed to create link to fetch next set of data
  const [prevPageUrl, setPrevPageUrl] = useState(); //USed to create link to fetch previous set of data
  const [loading, setLoading] = useState(true); //In case api is not responding

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios //Fetches data from api and stores in pokemon state variable
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p));
      });

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading)
    return (
      <div>
        <p className="loading">Loading...</p>
      </div>
    );
  return (
    <section>
      <div>
        <div className="cards container">
          {pokemon.map((p) => (
            <Tilt options={defaultOptions}>
              <div className="card" key={p.url.match(/\/(\d+)\/?$/)[1]}> {/* this is to extract the pokemon index value from url string */}
                <div className="cardbg"></div>
                <div className="cardimg">
                  <Tilt options={defaultOptions}>
                    {" "}
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                        p.url.match(/\/(\d+)\/?$/)[1]
                      }.png`}// Accesed hd png photo using pokemon index number
                      alt={p.name}
                    ></img>
                  </Tilt>
                </div>
                <div className="cardname">
                  <Tilt options={defaultOptions}>
                    <p>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</p>
                  </Tilt>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
        <div className="pagination">
          {prevPageUrl && (
            <button className="button" onClick={gotoPrevPage}>
              Previous
            </button>
          )}
          {nextPageUrl && (
            <button className="button" onClick={gotoNextPage}>
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default PokemonCardGenerator;
