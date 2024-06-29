import { BirdCard } from "./BirdCard";
import React from "react";
import {BirdData} from "../birdReducer";

export function SearchResults({ birdSightings }: { birdSightings : BirdData[] }) {
    return (
        <div className="bird-grid">
            { birdSightings.map((bird) => (
                    <BirdCard key={bird.speciesCode}
                        birdData={ bird }
                    />
            ))}
        </div>
    );
}
