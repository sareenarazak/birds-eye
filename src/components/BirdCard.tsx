import React from "react";

interface BirdData {
    commonName: string;
    scientificName: string;
    speciesCode: string;
    location: string;
    imageUrl: string;
}

export function BirdCard({ birdData } : { birdData : BirdData}) {
    const { commonName, scientificName, speciesCode, location, imageUrl } = birdData;

    return (
        <div className="bird-card">
            <div className="bird-image">
                <img src={imageUrl} alt={commonName}/>
            </div>

            <div className="bird-info">
                <h2 className="common-name">{commonName}</h2>
                <p className="scientific-name">Scientific Name: {scientificName}</p>
                <p className="species-code">Species Code: {speciesCode}</p>
                <p className="location">Sighting Location: {location}</p>
            </div>
        </div>
    );
}
