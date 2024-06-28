import './App.css'
import {SearchBar} from "./SearchBar.tsx";
import {useReducer, useState} from "react";
// import {SearchResults} from "./SearchResults";
// import {BirdRedcucer} from "./BirdRedcucer";
import {Favorites} from "./Favorites";

function App() {
    const BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';
    // const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;


    const [searchResults, setSearchResults] = useState([]);

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
        setSearchResults(data.map(d => {
            return  {
                speciesCode: d["speciesCode"],
                commonName: d["comName"]
            }
        }));

    }

  return (
    <>
        <SearchBar onSearch={ handleSubmitSearch }/>
        {/*<SearchResults/>*/}
        {/*<Favorites/>*/}
    </>
  )
}

export default App
