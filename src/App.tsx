import './App.css'
import React, {FormEvent, useReducer} from "react";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {birdReducer, initialState} from "./birdReducer";

function App() {
    const BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';
    // const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;

    const [birds, dispatch] = useReducer(birdReducer, initialState);

    async function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const latitude = Number.parseFloat(formData.get('latitude') as string);
        const longitude = Number.parseFloat(formData.get('longitude') as string);
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
        <SearchBar onSearch={ handleSearch }/>
        <SearchResults birdSightings={ birds.sightings }/>
        {/*<Favorites/>*/}
    </>
  )
}

export default App
