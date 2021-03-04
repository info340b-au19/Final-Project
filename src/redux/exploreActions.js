import store from './store';
import * as convert from 'color-convert';

export var UPDATE_QUERY = 'UPDATE_QUERY'
export var UPDATE_LOCK = 'UPDATE_LOCK'
export var RESET_LOCK = 'RESET_LOCK';
export var ADD_FILTER = 'ADD_FILTER';
export var REMOVE_FILTER = 'REMOVE_FILTER';
export var UPDATE_FILTERED_PALETTES_IF_FILTERED_LIST = 'UPDATE_FILTERED_PALETTES_IF_FILTERED_LIST';
export var UPDATE_FILTERED_PALETTES_IF_NOT_FILTERED_LIST = 'UPDATE_FILTERED_PALETTES_IF_NOT_FILTERED_LIST';
export var HANDLE_ERR = 'HANDLE_ERR';
export var FIREBASE_LOAD = 'FIREBASE_LOAD';



//--------------------------ADD_REMOVE_FILTER---------------------------------------------------------
/**
 * handleAddFilter returns the action to update filterList
 * @param {*} filter 
 */
export const handleAddFilter = (filter) => {
    if(!store.getState().explore.filterList.includes(filter)) {
        console.log('---filterlist now does not include the filter to be added---');
        let filters = store.getState().explore.filterList;
        let newFilters = filters.concat([filter]);
        let list = store.getState().explore.filteredPalettes.filter((palette) => 
        {return (palette.username === filter || convert.hex.keyword(palette.light_shade) === filter || 
        convert.hex.keyword(palette.light_accent) === filter || convert.hex.keyword(palette.main) === filter ||
        convert.hex.keyword(palette.dark_accent) === filter || convert.hex.keyword(palette.dark_shade) === filter);
        })
        return {
            type: ADD_FILTER,
            list: list,
            filters: newFilters,
            nFiltered: list.length
        }
    }
};


/**
 * handleRemoveFilter returns action to update filterList
 * @param {*} filter 
 */
export const handleRemoveFilter = (filter) => {
    return dispatch => {
        console.log('into remove')
        let filters = store.getState().explore.filterList.filter((data) => {
            return data !== filter;
        })
        dispatch({type: REMOVE_FILTER, filters: filters })
        if(store.getState().explore.filterList.length === 0){
            console.log('if statement 1')
            let palettes = store.getState().explore.palettes;
            let nFiltered = palettes.length
            dispatch({type: UPDATE_FILTERED_PALETTES_IF_FILTERED_LIST, palettes: palettes, nFiltered: nFiltered})
        } else{
            console.log('if statement 2')
            let palettes = store.getState().explore.palettes;
            let filterList = store.getState().explore.filterList;
            palettes = palettes.filter((data) => {
                return (filterList.includes(data.username) || filterList.includes(convert.hex.keyword(data.light_shade)) || 
                    filterList.includes(convert.hex.keyword(data.light_accent)) || filterList.includes(convert.hex.keyword(data.main)) ||
                    filterList.includes(convert.hex.keyword(data.dark_accent)) || filterList.includes(convert.hex.keyword(data.dark_shade)));
            });
            dispatch({type: UPDATE_FILTERED_PALETTES_IF_NOT_FILTERED_LIST, list: palettes, nFiltered: palettes.length})
        }
    }
};

//---------------------------------------------------------------------------------------------------------------------------

//--------------------------ORIGINAL_DATALOAD_FROM_FIREBASE------------------------------------------------------------------
export const handleFirebaseLoad = (palettesList) => {
    return {
        type: FIREBASE_LOAD,
        palettesList: palettesList,
        dataloadStatus: true
    }
}
//---------------------------------------------------------------------------------------------------------------------------


//--------------------------RESET_HANDLE_UPDATE_LOCK---------------------------------------------------------
/**
 * handleUpdateLock returns an action to update current lock status
 * and dispatches two other actions to add or remove filter list if necessary 
 * 
 * @param {object} filter 
 * @param {int} lockId 
 */
export const handleUpdateLock = (filter, lockId) => {
    //reducers have been combined store.getState should be changed
    console.log('handleIpdateLock将要返回一个以dispatch为参数的函数');
    return dispatch => {
        let currLockStatus = store.getState().explore.lockStatus;
        let selectedColorNames = store.getState().navigate.selectedPalette.map(x => convert.hex.keyword(x))
        let lockColor = selectedColorNames[lockId];
        for (let i = 0; i < 5; i++) {
            if (lockColor === selectedColorNames[i]) {
                currLockStatus[i] = !currLockStatus[i];
            }
        }
        console.log(currLockStatus, lockId, '------$$-----')
        if (currLockStatus[lockId]) {
            console.log('将要在handleUpdateLock中调用dispatch(() => handleAddFilter(filter))');
            dispatch(handleAddFilter(filter))
        } else {
            console.log('将要在handleUpdateLock中调用dispatch(() => handleRemoveFilter(filter))');
            dispatch(handleRemoveFilter(filter))
        }
        console.log('将要在handleUpdateLock中调用dispatch({type: UPDATE_LOCK, currLockstatus: currLockstatus})');
        dispatch({
            type: UPDATE_LOCK,
            currLockStatus: currLockStatus
        })
    }
};

/**
 * handleResetLock returns action to reset lock in exploreReducer
 */
export const handleResetLock = () => {
    return {
        type: RESET_LOCK
    }
};
//-----------------------------------------------------------------------------------




//--------------------------------UPDATE_QUERY---------------------------------------------------
/**
 * updateQuery returns an action to update current search query
 * @param {string} input 
 */
export const updateQuery = (input) => {
    console.log('------yes, uodateQuery action is working---', input);
    let cleanedInput = input.toLowerCase().replace(/\s+/g, '');
    return {
        type: UPDATE_QUERY,
        input: cleanedInput
    }
}
//-----------------------------------------------------------------------------------




//---------------------HANDLE_ERROR--------------------------------------------------------------
// shows the error message
export const handleError = (msg) => {
    return (dispatch) => {
        dispatch({type: HANDLE_ERR, msg: msg})
        setTimeout(() => {
            dispatch({type: HANDLE_ERR, msg: ''})
        }, 3000)
    }
}
//-----------------------------------------------------------------------------------
