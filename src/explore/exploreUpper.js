import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';
import { FilterContainer } from './exploreFilter.js';

export class UpperContainer extends Component {
    render() {
        let searchBoxProp = {handleAddFilter: this.props.propList.handleAddFilter, handleSearch: this.props.propList.handleSearch, 
            searchQuery: this.props.propList.searchQuery, handleLock: this.props.propList.handleLock, selectedPalette: this.props.propList.selectedPalette, 
            filterList: this.props.propList.filterList, handleError: this.props.propList.handleError}
        
        let filterContainerProp = {filterList: this.props.propList.filterList, handleLock: this.props.propList.handleLock, 
            handleRemoveFilter: this.props.propList.handleRemoveFilter, selectedPalette: this.props.propList.selectedPalette}
        
            return (
            <section id="uppercontainer">
                <h2>Explore Other Creations</h2>
                <div id="searchcontainer">
                    <SearchBox propList={searchBoxProp} />
                    <FilterContainer propList={filterContainerProp} />
                </div>
            </section>
        );
    }
}

class SearchBox extends Component {
    trackInput = (e) => {
        this.props.propList.handleSearch(e.target.value);
    }

    handleClick = (e) => {
        e.preventDefault();
        let filter = this.props.propList.searchQuery;

        if (this.props.propList.filterList.includes(filter)) {
            this.props.propList.handleError('Already filtered!');
            
        } else {
            let selectedColorNames = this.props.propList.selectedPalette.map(x => convert.hex.keyword(x));
            let lockId = selectedColorNames.indexOf(filter);
            if (lockId !== -1) {
                this.props.propList.handleLock(filter, lockId);
            }
            this.props.propList.handleAddFilter(filter);
        }
    }

    render() {
        return (
            <form className="searchbox" action="">
                <input type="text" id="searchinput" placeholder="Search..." aria-label="search input" onChange={this.trackInput}/>
                <button type="submit" id="searchbutton" onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faSearch} className='fa-search' aria-hidden="true" />
                </button>
            </form>
        );
    }
}