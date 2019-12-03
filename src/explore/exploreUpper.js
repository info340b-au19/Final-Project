import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';

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

export class ShowError extends Component {
    render() {

        return (
            <div>
                {this.props.msg != '' &&
                    <p id="error" role="alert">{this.props.msg}</p>
                }
            </div>
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
            if (lockId != -1) {
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

class FilterContainer extends Component {
    render() {
        let filterProp = {handleLock: this.props.propList.handleLock, handleRemoveFilter: this.props.propList.handleRemoveFilter, 
            selectedPalette: this.props.propList.selectedPalette};

        let filters = this.props.propList.filterList.map(x => <Filter filterText={x} propList={filterProp}/>);

        return (
            <div id="filterContainer">
                {filters}
            </div>
        );
    }
}

class Filter extends Component {
    handleClick = () => {
        let filter = this.props.filterText;
        
        let selectedColorNames = this.props.propList.selectedPalette.map(x => convert.hex.keyword(x));
        
        let lockId = selectedColorNames.indexOf(filter);
        if (lockId != -1) {
            this.props.propList.handleLock(filter, lockId);
        }
        this.props.propList.handleRemoveFilter(filter);
    }

    render() {
        return (
            <div className="filter" aria-label="delete filter" role="button" onClick={this.handleClick}>
                <FontAwesomeIcon icon={faTimes} className='fa-times' aria-hidden="true" />
                <p>{this.props.filterText}</p>
            </div>
        )
    }
}