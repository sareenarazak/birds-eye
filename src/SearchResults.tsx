import {BirdCard} from "./BirdCard";
import React from "react";

export function SearchResults ({ birdSightings }) {
    return (
        <div>
            <ul>
                { birdSightings.map((bird) => {
                        return <li key={bird['speciesCode']}>
                            <BirdCard
                                commonName={bird.comName}
                                scientificName={bird.sciName}
                                speciesCode={bird.speciesCode}
                                location={bird.locId}
                            />
                        </li>;
                    }
                )}
            </ul>
        </div>
    )
}
