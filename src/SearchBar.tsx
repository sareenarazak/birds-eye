import {useState} from "react";
export function SearchBar() {
    const [ coordinates, setCoordinates] = useState('');
    const BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = import.meta.env.VITE_EBIRD_API_KEY;

    async function handleSubmitSearch(event: Event) {
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
            <h1> Enter latitude and longitude to search bird sightings</h1>
            <input
                type="text"
                value={ coordinates }
                placeholder="180,-90"
                onChange={
                    (e) => {
                        setCoordinates(e.target.value);
                    }}
            />
            <button onClick={ handleSubmitSearch } type="submit">Search</button>

        </>

    )
}
