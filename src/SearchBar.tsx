import {useState} from "react";

export function SearchBar() {
    // TODO : move the API key to a .env file
    const API_KEY: string= '';

    // TODO : Give either option to latitude longitude or Select option for regioncode
    // const URL = `https://api.ebird.org/v2/data/obs/${regionCode}/recent`;
    const [ coordinates, setCoordinates] = useState('');
    const BASE_URL = 'https://api.ebird.org/v2/data/obs/geo/recent?';
    const [searchResults, setSearchResults] = useState([]);

    async function handleSubmitSearch(event: Event) {
        event.preventDefault();

        // TODO : refactor
        const latitude = Number.parseFloat(coordinates.split(",")[0]);
        const longitude = Number.parseFloat(coordinates.split(",")[1]);
        const URL =  `${BASE_URL}&lat=${latitude}&lng=${longitude}`;

        console.log(URL);

        const response = await fetch(URL, {
            headers : {
                "X-eBirdApiToken": API_KEY,
        }});
        const data = await response.json();
        setSearchResults(data.map(d => {
            return {
                "speciesCode": d["speciesCode"],
                "commonName": d["comName"]
            }}));
        console.log(searchResults);
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
                        // TODO : Add validation for input or define typescript type
                        setCoordinates(e.target.value);
                    }}
            />
            <button onClick={ handleSubmitSearch } type="submit">Search</button>
        </>

    )
}
