import React from "react";
import {BirdCard} from "./BirdCard";

export function SearchResults ({ birdSightings }) {
    return (
        <div>
            <ul>
                { birdSightings.map(bird => {
                        return <li key={bird.speciesCode}><BirdCard {...bird}></BirdCard></li>;
                    }
                )}
            </ul>
        </div>
    )
}
