export const initialState = {
    sightings: [],
};

export function  birdReducer(birds, action) {
    switch (action.type) {
        case 'set_sightings': {
            return {
                ...birds,
                sightings: action.sightings
            }
        }
    }
}
