import React, {FormEvent, useState} from "react";

interface SearchBarProps {
    onSearch: (event: FormEvent<HTMLButtonElement>, coordinates: string) => void;
}

export function SearchBar({ onSearch } : SearchBarProps) {

    const [ coordinates, setCoordinates] = useState('');

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
            <button
                onClick={ (event) => onSearch(event, coordinates) }
                type="submit"
            >
                Search
            </button>
        </>

    )
}
