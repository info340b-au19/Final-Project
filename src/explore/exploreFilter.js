
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';
import { useSelector, useDispatch } from 'react-redux';
import { handleUpdateLock, handleRemoveFilter } from '../redux/exploreActions';

export function FilterContainer() {
    let filters = useSelector(state => state.explore.filterList).map(x => <Filter filterText={x}/>)
    return (
        <div id="filterContainer">
            {filters}
        </div>
    )

}

const Filter = ({filterText}) => {
    let dispatch = useDispatch()
    let selectedColorNames = useSelector(state => state.navigate.selectedPalette).map(x => convert.hex.keyword(x));

    function handleClick() {
        let lockId = selectedColorNames.indexOf(filterText);
        if (lockId !== -1){
            console.log('into updatelock')
            dispatch(() => handleUpdateLock(filterText, lockId))
        }
        dispatch(handleRemoveFilter(filterText))
    }

    return (
        <div className="filter" aria-label="delete filter" role="button" onClick={handleClick}>
            <FontAwesomeIcon icon={faTimes} className='fa-times' aria-hidden="true" />
            <p>{filterText}</p>
        </div>
    )
}
