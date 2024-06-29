import React from "react";
import { BirdData } from "../birdReducer";

export function BirdCard({ birdData } : { birdData : BirdData}) {
    const { commonName, scientificName, location, imageUrl } = birdData;

    return (
        <div className="bird-card">
            <div className="bird-image">
                <img src={imageUrl} alt={commonName}/>
            </div>

            <div className="bird-info">
                <h2 className="common-name">{commonName}</h2>
                <h4 className="scientific-name"><i>{scientificName}</i></h4>
                <p className="location">location: {location}</p>
            </div>
        </div>
    );
}
