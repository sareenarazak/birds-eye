import {BirdCard} from "./BirdCard";
import {useReducer} from "react";
import {birdRedcucer} from "./BirdRedcucer";

export function SearchResults ({birds}) {

    return (
        <div>
            <ul>
                {birds.map(bird =>
                    <li key={bird.speciesCode}><BirdCard {...bird}></BirdCard></li>
                )}
            </ul>
        </div>
    )
}
