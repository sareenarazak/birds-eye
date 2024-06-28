import React from "react";
interface BirdData {
    commonName: string;
    scientificName: string;
    speciesCode: string;
    location: string;
}
export function BirdCard({ commonName, scientificName, speciesCode, location }: BirdData) {
    return (
        <div>
            <p>Common Name: {commonName}</p>
            <p>Scientific Name: {scientificName}</p>
            <p>Species Code: {speciesCode}</p>
            <p>Sighting Location: {location}</p>
        </div>
    );
}
