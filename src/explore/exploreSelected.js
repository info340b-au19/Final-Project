import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import {handleUpdateLock} from '../redux/exploreActions';
import * as convert from 'color-convert';



export const SelectedPanel = () => {
    let ifSelected = useSelector(state => state.navigate.selected)
    if(ifSelected) {
        let optionLabels = [{id: 0, color: 'light shade'}, {id: 1, color: 'light accent'}, {id: 2, color: 'main color'},
        {id: 3, color: 'dark accent'}, {id: 4, color: 'dark shade'}];
        let selectedPalette = optionLabels.map(x => <SelectedPalette colorId={x.id}/>)
        let optionContainers = optionLabels.map(x => <OptionContainer label={x}/>)
        return (
            <div id="selectedpanel">
            <div id="selectedpalette" aria-label="selected palette">
                {selectedPalette}
            </div>
            <div id="coloroption">
                {optionContainers}
            </div>
        </div>
        )
    } 
    return (
        <div></div>
    )
}

const SelectedPalette = (colorId) => {
    let palete = useSelector(state => state.navigate.selectedPalette)
    let color = {backgroundColor: palete[colorId.colorId]};

    return(
        <div className="color" id={'color' + colorId} style={color}></div>
    )
}


const OptionContainer = (label) => {
    let dispatch = useDispatch();
    let locked = useSelector(state => state.explore.lockStatus);
    let palete = useSelector(state => state.navigate.selectedPalette);
    let handleClick = () => {
        let filter = convert.hex.keyword(palete[label.id]);
        dispatch(handleUpdateLock(filter, label.id))
    }

    let className = 'lock';
    if(locked) {
        className += ' locked';
    }

    return(
        <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + label.color} aria-live="polite">
                    {palete[label.id]}
                </p>
                <button className={className} id={'lock' + label.id} aria-label="color lock" aria-pressed="true" 
                onClick={handleClick}>
                    <FontAwesomeIcon icon={faLock} className='fa-lock' aria-label='menu' />
                </button>
        </div>
    )
    
}
