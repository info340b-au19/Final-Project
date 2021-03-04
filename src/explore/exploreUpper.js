import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';
import { FilterContainer } from './exploreFilter.js';
import { useSelector, useDispatch} from 'react-redux';
//import store from '../redux/store';
import { updateQuery, handleError, handleUpdateLock, handleAddFilter } from '../redux/exploreActions';


export const UpperContainer = () => {
    return (
            <section id="uppercontainer">
                <h2>Explore Other Creations</h2>
                <div id="searchcontainer">
                    <SearchBox/>
                    <FilterContainer/>
                </div>
            </section>
    );
};


function SearchBox () {
    let dispatch = useDispatch()
    let filter = useSelector(state => state.explore.searchQuery);
    let filterList = useSelector(state => state.explore.filterList)
    let selectedColorNames = useSelector(
        //get selectedPalettes from app state
        state => state.navigate.selectedPalette
    )
    selectedColorNames = selectedColorNames.map(x => convert.hex.keyword(x))

    function trackInput(e) {
        dispatch(updateQuery(e.target.value))
    }

    function handleClick(e) {
        e.preventDefault();
        console.log('click始')
        if(filterList.includes(filter)) {
            //hadle err action
            dispatch(handleError('already filtered! 已被过滤'))
        } else if(selectedColorNames.indexOf(filter) !== -1) {
                //handle lock action
                dispatch(handleUpdateLock(filter, selectedColorNames.indexOf(filter)))
            //add filter action
            console.log('click终');
        } else {
            dispatch(handleAddFilter(filter))
        }
    }

    return (
        <form className="searchbox" action="">
        <input type="text" id="searchinput" placeholder="Search..." aria-label="search input" onChange={trackInput}/>
        <button type="submit" id="searchbutton" onClick={e => handleClick(e)}>
            <FontAwesomeIcon icon={faSearch} className='fa-search' aria-hidden="true" />
        </button>
    </form>       
    )
}
