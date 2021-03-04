import { UPDATE_QUERY, UPDATE_LOCK, RESET_LOCK, ADD_FILTER, REMOVE_FILTER, UPDATE_FILTERED_PALETTES_IF_FILTERED_LIST,  
        UPDATE_FILTERED_PALETTES_IF_NOT_FILTERED_LIST, HANDLE_ERR, FIREBASE_LOAD} from './exploreActions';

const explore_state = {palettes: [], filteredPalettes: [], nFiltered: 0, error: '', 
dataLoaded: false, filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''}

/**
 * reducer for explore.js and relevant components
 * @param {object} state 
 * @param {object} action 
 */
function expReducer(state=explore_state, action) {
    switch(action.type) {
        case UPDATE_QUERY:
        console.log(UPDATE_QUERY);
            return {
                ...state,
                searchQuery: action.input
            }

        case UPDATE_LOCK:
            return {
                ...state,
                lockStatus: action.currLockStatus
            }
        
        case RESET_LOCK:
            return {
                ...state,
                lockStatus: [false, false, false, false, false]
            }
        
        case ADD_FILTER:
            return {
                ...state,
                filteredPalettes: action.list,
                filterList: action.filters,
                nFiltered: action.nFiltered
            }

        case FIREBASE_LOAD:
            return {
                ...state,
                palettes: action.palettesList,
                filteredPalettes: action.palettesList,
                nFiltered: action.palettesList.length,
                dataLoaded: action.dataloadStatus
            }

        case REMOVE_FILTER:
            return {
                ...state,
                filterList: action.filters
            }

        case UPDATE_FILTERED_PALETTES_IF_FILTERED_LIST:
            return {
                ...state,
                filteredPalettes: action.palettes,
                nFiltered: action.nFiltered
            }

        case UPDATE_FILTERED_PALETTES_IF_NOT_FILTERED_LIST:
            return {
                ...state,
                filteredPalettes: action.list,
                nFiltered: action.nFiltered
            }
        
        case HANDLE_ERR: 
            return {
                ...state,
                err: action.msg
            }

        default: return state
    }
}

export default expReducer