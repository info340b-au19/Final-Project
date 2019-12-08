
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';

export class FilterContainer extends Component {
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
        if (lockId !== -1) {
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