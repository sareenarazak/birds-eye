import './App.css'
import React, {useReducer} from "react";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {birdReducer, initialState} from "./birdReducer";

function App() {
    const BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';
    // const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;

    const [birds, dispatch] = useReducer(birdReducer, initialState);

    async function handleSubmitSearch(event: Event, coordinates: string) {
        event.preventDefault();

        const latitude = Number.parseFloat(coordinates.split(",")[0]);
        const longitude = Number.parseFloat(coordinates.split(",")[1]);
        const URL =  `${BASE_URL}lat=${latitude}&lng=${longitude}`;

        console.log(URL);

        const response = await fetch(URL, {
            headers : {
                "X-eBirdApiToken": import.meta.env.VITE_BIRD_API_KEY,
            }});

        const data = await response.json();
        dispatch({
            type: 'set_sightings',
            sightings: data,
        })
    }

  return (
    <>
        <SearchBar onSearch={ handleSubmitSearch }/>
        <SearchResults birdSightings={ birds.sightings }/>
        {/*<Favorites/>*/}
    </>
  )
}

export default App
