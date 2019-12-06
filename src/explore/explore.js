import React, { Component } from 'react';
import {UpperContainer, ShowError} from './exploreUpper.js';
import {SelectedPanel} from './exploreSelected.js';
import {NumberOfResult, CardContainer} from './explorePalettes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPalette} from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert'; // for converting color values
import firebase from "firebase/app";
import 'firebase/database';
import './explore.css';

export class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, error: '', 
            dataLoaded: false, filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''}
    }

    componentDidMount() {
        this.palettesRef = firebase.database().ref('palettes');
        this.palettesRef.on('value', (snapshot => {
            this.setState({palettes: snapshot.val(), filteredPalettes: snapshot.val(), nFiltered: snapshot.val().length, dataLoaded: true});
        }));
        console.log(this.props);
        
    }

    componentWillUnmount() {
        this.palettesRef.off();
    }

    // adds new filter
    handleAddFilter = (filter) => {
        if (!this.state.filterList.includes(filter)) {

            let filters = this.state.filterList;
            filters.push(filter);
            
            let list = this.state.filteredPalettes.filter((palette) => {
                
                return (palette.username == filter || convert.hex.keyword(palette.light_shade) == filter || 
                convert.hex.keyword(palette.light_accent) == filter || convert.hex.keyword(palette.main) == filter ||
                convert.hex.keyword(palette.dark_accent) == filter || convert.hex.keyword(palette.dark_shade) == filter);
            });
            this.setState({ filteredPalettes: list , filterList: filters, nFiltered: list.length });
        }
    }

    // remove an existing filter
    handleRemoveFilter = (filter) => {
        let list = this.state.filterList.filter((data) => {
            return data != filter;
        })
        this.setState({ filterList: list }, () => {
            if (this.state.filterList.length == 0) {
                this.setState({ filteredPalettes: this.state.palettes, nFiltered: this.state.palettes.length });
            } else {
                let list = this.state.palettes;
                let filterList = this.state.filterList;
                list = list.filter((data) => {
                    return (filterList.includes(data.username) || filterList.includes(convert.hex.keyword(data.light_shade)) || 
                        filterList.includes(convert.hex.keyword(data.light_accent)) || filterList.includes(convert.hex.keyword(data.main)) ||
                        filterList.includes(convert.hex.keyword(data.dark_accent)) || filterList.includes(convert.hex.keyword(data.dark_shade)));
                });
                
                this.setState({ filteredPalettes: list , nFiltered: list.length});
            }
        });
    }

    // updates the color lock buttons
    handleUpdateLock = (filter, lockId) => {
        let currLockStatus = this.state.lockStatus;
        
        let selectedColorNames = this.props.propList.selectedPalette.map(x => convert.hex.keyword(x));
        let lockColor = selectedColorNames[lockId];
        for (let i = 0; i < 5; i++) {
            if (lockColor == selectedColorNames[i]) {
                currLockStatus[i] = !currLockStatus[i];
            }
        }
        if (currLockStatus[lockId]) {
            this.handleAddFilter(filter);
        } else {
            this.handleRemoveFilter(filter);
        }
        
        this.setState({ lockStatus: currLockStatus });
    }

    // resets the color lock buttons
    handleResetLock = () => {
        this.setState({ lockStatus: [false, false, false, false, false] });
    }
    
    // tracks the input in search box
    handleUpdateQuery = (input) => {
        let cleanedInput = input.toLowerCase().replace(/\s+/g, '');
        this.setState({ searchQuery: cleanedInput });
    }

    // shows the error message
    handleError = (msg) => {
        
        this.setState({ error: msg });
        setTimeout(() => {
            this.setState({ error: '' });
        }, 3000);
    }

    render() {
        let upperContainerProp = {filterList: this.state.filterList, handleAddFilter: this.handleAddFilter, handleSearch: this.handleUpdateQuery,
            searchQuery: this.state.searchQuery, handleLock: this.handleUpdateLock, handleRemoveFilter: this.handleRemoveFilter,
            selectedPalette: this.props.propList.selectedPalette, handleError: this.handleError};
        
        let cardContainerProp = {filteredData: this.state.filteredPalettes, handleClick: this.props.propList.handleSelectPalette, 
            handleResetLock: this.handleResetLock};

        let selectedPanelProp = {selected: this.props.propList.selected, palette: this.props.propList.selectedPalette, handleLock: this.handleUpdateLock, 
            lockStatus: this.state.lockStatus}

        return (
            <main>
                <UpperContainer propList={upperContainerProp} />
                <ShowError msg={this.state.error}/>
                <NumberOfResult nResult={this.state.nFiltered} />
                {!this.state.dataLoaded &&
                    <FontAwesomeIcon icon={faPalette} className='fa-palette' spin/>
                }
                <CardContainer propList={cardContainerProp} />
                <SelectedPanel propList={selectedPanelProp} />
            </main>
        );
    }
}