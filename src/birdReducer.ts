interface Birds {
    sightings: [];
}

interface Action {
    type: string;
    sightings: [];
}

export const initialState: Birds = {
    sightings: [],
};

export function  birdReducer(birds:  Birds, action: Action) {
    switch (action.type) {
        case 'set_sightings': {
            return {
                ...birds,
                sightings: action.sightings
            }
        }

        default:
            return birds;
    }
}
