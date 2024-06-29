import "./App.css"
import React, { FormEvent, useReducer } from "react";
import { SearchBar } from "./components/SearchBar";
import { SearchResults } from "./components/SearchResults";
import { BirdData, birdReducer, initialState} from "./birdReducer";
import { Favorites } from "./components/Favorites";

function App() {
    const E_BIRD_BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';

    const [state, dispatch] = useReducer(birdReducer, initialState);


    async function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const latitude = Number.parseFloat(formData.get('latitude') as string);
        const longitude = Number.parseFloat(formData.get('longitude') as string);

        const URL =  `${E_BIRD_BASE_URL}lat=${latitude}&lng=${longitude}`;

        try {
            const response = await fetch(URL, {
                headers : {
                    "X-eBirdApiToken": import.meta.env.VITE_BIRD_API_KEY,
                }});

            const data = await response.json();

            // TODO : batch request for images + refactor
            const birdSightingsData: BirdData[] = await Promise.all(
                data.map(async (d) => {
                    const imageUrl = await getWikiImage(d.sciName);
                    return {
                        commonName: d.comName,
                        speciesCode: d.speciesCode,
                        scientificName: d.sciName,
                        location: d.locId,
                        imageUrl: imageUrl
                    };
                })
            );

            dispatch({
                type: 'populate_sightings',
                birdSightings: birdSightingsData,
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
            return pages[imageId].thumbnail?.source || 'no_image';
        }

        //TODO: keep a default bird image file and return the url
        return 'no_image';
    }

    return (
        <>
            <SearchBar onSearch={ handleSearch }/>
            <Favorites favorites={
                Array.from(state.favorites.keys())
                    .map((fav) => state.birdData.filter((bird) => fav === bird.speciesCode))
                    .reduce((acc, val) => acc.concat(val), [])
            }/>
            <SearchResults birdSightings={ state.birdData }/>
        </>
    )
}

export default App
