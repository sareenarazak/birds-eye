import './App.css'
import React, {FormEvent, useReducer} from "react";
import {SearchBar} from "./components/SearchBar";
import {SearchResults} from "./components/SearchResults";
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
        try {
            const response = await fetch(URL, {
                headers : {
                    "X-eBirdApiToken": import.meta.env.VITE_BIRD_API_KEY,
                }});

            const data = await response.json();

            // TODO : batch request for images
            const birdSightings = await Promise.all(
                data.map(async (d) => {
                    const imageUrl = await getWikiImage(d.sciName);
                    return {
                        ...d,
                        imageUrl
                    };
            }));

            dispatch({
                type: 'set_sightings',
                sightings: birdSightings,
            });
        } catch (error) {
            console.error('Error fetching bird sightings:', error);
        }

    }

    async function getWikiImage(name: string) {
        // Yikes `redirects=1` very important
        const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${encodeURIComponent(name)}&pithumbsize=500&origin=*&redirects=1`;

        const wikiResponse = await fetch(wikiURL);
        const data = await wikiResponse.json();
        const pages = data.query.pages;

        if (Object.keys(pages).length > 0) {
            const imageId = Object.keys(pages)[0];
            console.log(imageId)
            return pages[imageId].thumbnail?.source || 'no_image';
        }

        //TODO: keep a default bird image file and return the url
        return 'no_image';
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
