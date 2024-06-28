import {BirdCard} from "./BirdCard";
import React from "react";

export function SearchResults ({ birdSightings }) {
    return (
        <div>
            <ul>
                { birdSightings.map(bird => {
                        return <li key={bird['speciesCode']}><BirdCard speciesCode={ bird['speciesCode'] } commonName={ bird['comName'] }></BirdCard></li>;
                    }
                )}
            </ul>
        </div>
    )
}
