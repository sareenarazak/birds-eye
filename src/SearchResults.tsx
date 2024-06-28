import {BirdCard} from "./BirdCard";
import React from "react";

export function SearchResults({ birdSightings }: { birdSightings: any[] }) {
    return (
        <div className="bird-grid">
            {birdSightings.map((bird) => (
                    <BirdCard key={bird.speciesCode}
                        birdData={{
                            commonName: bird.comName,
                            scientificName: bird.sciName,
                            speciesCode: bird.speciesCode,
                            location: bird.locId,
                            imageUrl: bird.imageUrl
                        }}
                    />
            ))}
        </div>
    );
}
