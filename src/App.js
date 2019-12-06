import React, { Component } from 'react';
import './index.css';
import * as d3 from 'd3';
import palettesData from './palettes.csv';
import * as convert from 'color-convert'; // for converting color values
import {NavBar, MobileNav} from './navigate.js';
import {Explore} from './explore/explore.js';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import {Create} from './create/create.js';

// main component
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, selected: false, error: '', mobileMenuOn: false,
        selectedPalette: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], 
        dataLoaded: false, filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''};
    }

    // loads data
    componentDidMount() {
        d3.csv(palettesData, (palettesData) => {
            this.setState(state => {
                let data = state.palettes.push(palettesData);
                return data;
            });
            this.setState(state => {
                let data = state.filteredPalettes.push(palettesData);
                return data;
            });
            this.setState(state => {
                let data = state.nFiltered++;
                return data;
            });
            this.setState({ dataLoaded: true });
        });
    }

    // shows the selected palette
    handleSelectPalette = (palette) => {
        if (!this.state.selected) {
            this.setState({selected: true});
        }
        this.setState({ selectedPalette: palette });
    }

    // apply selected theme when apply tab is clicked
    handleApplyClick = () => {
        console.log('h');
        
        if (this.state.selected) {
            this.setState({ currentTheme: this.state.selectedPalette, selected: false });
        }
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
        
        let selectedColorNames = this.state.selectedPalette.map(x => convert.hex.keyword(x));
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

    // functionality for mobile menu (hamburger menu)
    handleMobileMenu = () => {
        let status = !this.state.mobileMenuOn;
        this.setState({ mobileMenuOn: status });
    }

    handleCreateChange = (color, index) => {
        let newSelectedPalette = this.state.selectedPalette;
        newSelectedPalette[index] = color;
        this.setState({selectedPalette: newSelectedPalette, selected: true});
    }

    render() {
        let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
        
        let upperContainerProp = {filterList: this.state.filterList, handleAddFilter: this.handleAddFilter, handleSearch: this.handleUpdateQuery,
            searchQuery: this.state.searchQuery, handleLock: this.handleUpdateLock, handleRemoveFilter: this.handleRemoveFilter,
            selectedPalette: this.state.selectedPalette, handleError: this.handleError};
        
        let cardContainerProp = {filteredData: this.state.filteredPalettes, handleClick: this.handleSelectPalette, 
            handleResetLock: this.handleResetLock};

        let selectedPanelProp = {selected: this.state.selected, palette: this.state.selectedPalette, handleLock: this.handleUpdateLock, 
            lockStatus: this.state.lockStatus}

        let exploreProps = {upperContainerProp: upperContainerProp, cardContainerProp: cardContainerProp, selectedPanelProp: selectedPanelProp,
            error: this.state.error, nFiltered: this.state.nFiltered, dataLoaded: this.state.dataLoaded};
    
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        return (

            <div className='appContainer' style={style}>
                <header>
                    <Link exact to='/'><h1>acryline</h1></Link>
                </header>
                <NavBar handleApply={this.handleApplyClick} handleMobileMenu={this.handleMobileMenu}/>
                <MobileNav propList={mobileNavProp} />
                <Switch>
                    <Route exact path='/' render={() => <main></main>}/>
                    <Route path='/create' render={() => <Create selectedPalette={this.state.selectedPalette} handleCreateChange={this.handleCreateChange}/>}/>
                    <Route path='/explore' render={() => <Explore propList={exploreProps}/>}/>
                    <Redirect to='/'></Redirect>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
                <address>Contact: <a href='mailto:ghcho@uw.edu'>ghcho@uw.edu</a> |  <a href='mailto:jz73@uw.edu'>jz73@uw.edu</a></address>
            </footer>
        );
    }
}