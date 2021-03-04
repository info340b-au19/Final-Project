import store from './store';

export var APPLY = 'APPLY';
export var MOBILE = 'MOBILE';
export var HANDLE_SELECTED_PALETTE = 'HANDLE_SELECTED_PALETTE';
export var SWITCHS_ELECTED = 'SWITCHS_ELECTED';

export const applyChange = () => {
    return {
        type: APPLY,
    }
}

export const switchMobile = () => {
    return {
        type: MOBILE
    }
}

export const switchSelected = () => {
    let newSelectedStatus;
    if(store.getState().navigate.selected){
        newSelectedStatus = false
    }else {
        newSelectedStatus = true
    }
    console.log('action should be sent at newSelectedStatus = ', newSelectedStatus, 
                'and type = ', SWITCHS_ELECTED);
    return {
        type: SWITCHS_ELECTED,
        newSelectedStatus: newSelectedStatus
    }
}

export const handleSelectPalette = (pallete) => {

    return dispatch => { 
        if(!store.getState().navigate.selected) {
            dispatch(switchSelected())
        }
        dispatch({
                type: HANDLE_SELECTED_PALETTE,
                pallete: pallete,
                selected: true
            })
    }
}


