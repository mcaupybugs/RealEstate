import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_PROPERTY':
            return { ...state, [action.payload.id]: action.payload };
        case 'EDIT_PROPERTY':
            return { ...state, [action.payload.id]: action.payload };
        case 'ADD_PROPERTY':
            return { ...state, [action.payload.id]: action.payload };
        case 'FETCH_PROPERTIES':
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case 'DELETE_PROPERTY':
            return _.omit(state, action.payload);
        default:
            return state;
    }
}