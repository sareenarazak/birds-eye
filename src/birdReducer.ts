export interface BirdData {
    commonName: string;
    speciesCode: string;
    scientificName: string;
    location: string;
    imageUrl: string;
}

interface State {
    birdData: BirdData[];
    // TODO : bird sightings key needs to be unique --> not species code
    sightings: string[];
    favorites: Set<string>;
}

type Action =  {
    type: 'populate_sightings';
    birdSightings: BirdData[];
} | {
    type: 'add_favorite';
    birdId: string;
} |  {
    type: 'remove_favorite';
    birdId: string;
};

export const initialState: State = {
    birdData: [],
    sightings: [],
    favorites: new Set(["rocpig"]),
};

export function  birdReducer(state: State, action: Action) {
    switch (action.type) {
        case 'populate_sightings': {
            return {
                ...state,
                birdData: action.birdSightings,
                sightings: action.birdSightings.map((sighting) => {
                    sighting.speciesCode
                }),
            }
        }

        case 'add_favorite': {
            const favsCopy = new Set(state.favorites);
            favsCopy.add(action.birdId);
            return {
                ...state,
                favorites: favsCopy,
            }
        }
        case 'remove_favorite': {
            const favsCopy = new Set(state.favorites);
            favsCopy.delete(action.birdId);

            return {
                ...state,
                favorites: favsCopy,
            }
        }
        default:
            return state;
    }
}
