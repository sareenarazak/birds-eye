import React, {FormEvent} from "react";

interface SearchBarProps {
    onSearch: (event: FormEvent<HTMLFormElement>) => void;
}

export function SearchBar({ onSearch } : SearchBarProps) {


    return (
        <>
            <h3> Search for bird sightings</h3>
            <form onSubmit={(event) => onSearch(event)}>
                <label htmlFor="latitude">Latitude</label>
                <input name="latitude" placeholder="180"/>
                <br/>
                <label htmlFor="longitude">Longitude</label>
                <input name="longitude" placeholder="90"/>
                <br/>
                <button type="submit">Search</button>
            </form>

        </>

    )
}
