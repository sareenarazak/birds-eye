import React from "react";
import {BirdData} from "../birdReducer";
import {BirdCard} from "./BirdCard";

export function Favorites({ favorites } : {favorites: BirdData[]}) {
    return (
        <div className="bird-grid">
            { favorites.map((bird) => (
                <BirdCard key={bird.speciesCode}
                          birdData={ bird }
                />
            ))}
        </div>
    );}
