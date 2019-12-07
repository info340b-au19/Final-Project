import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {faPalette} from '@fortawesome/free-solid-svg-icons';
import './index.css';
import * as d3 from 'd3';
import palettesData from './palettes.csv';
import FrontPage from './Front';
import * as convert from 'color-convert'; // for converting color values
import {Route, Link, Switch, NavLink, Redirect} from 'react-router-dom';

// main component
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, selected: false, error: '', mobileMenuOn: false,
        selectedPalette: [], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], dataLoaded: false,
        filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''};
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
        
        this.setState({ selected: true });
        this.setState({ selectedPalette: palette });
        
    }

    // apply selected theme when apply tab is clicked
    handleApplyClick = () => {
        if (this.state.selected) {
            this.setState({ currentTheme: this.state.selectedPalette });
        }
    }

    // adds new filter
    handleAddFilter = (filter) => {
        if (!this.state.filterList.includes(filter)) {

            let filters = this.state.filterList;
            filters.push(filter);
            this.setState({ filterList: filters });
            
            let list = this.state.filteredPalettes.filter((palette) => {
                
                return (palette.username == filter || convert.hex.keyword(palette.light_shade) == filter || 
                convert.hex.keyword(palette.light_accent) == filter || convert.hex.keyword(palette.main) == filter ||
                convert.hex.keyword(palette.dark_accent) == filter || convert.hex.keyword(palette.dark_shade) == filter);
            });
            this.setState({ filteredPalettes: list });
            this.setState({ nFiltered: list.length});
        }
    }

    // remove an existing filter
    handleRemoveFilter = (filter) => {
        let list = this.state.filterList.filter((data) => {
            return data != filter;
        })
        this.setState({ filterList: list }, () => {
            if (this.state.filterList.length == 0) {
                this.setState({ filteredPalettes: this.state.palettes });
                this.setState({ nFiltered: this.state.palettes.length});
            } else {
                let list = this.state.palettes;
                let filterList = this.state.filterList;
                list = list.filter((data) => {
                    return (filterList.includes(data.username) || filterList.includes(convert.hex.keyword(data.light_shade)) || 
                        filterList.includes(convert.hex.keyword(data.light_accent)) || filterList.includes(convert.hex.keyword(data.main)) ||
                        filterList.includes(convert.hex.keyword(data.dark_accent)) || filterList.includes(convert.hex.keyword(data.dark_shade)));
                });
                
                this.setState({ filteredPalettes: list });
                this.setState({ nFiltered: list.length});
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
        
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        return (
            <div className='appContainer' id="bootstrap-override" style={style}>
                <header>
                    <Link to='/'><h1>acryline</h1></Link>
                </header>
                <NavBar handleApply={this.handleApplyClick} handleMobileMenu={this.handleMobileMenu}/>
                <MobileNav propList={mobileNavProp} />
                {/*below part should be included into one route */}
                <Switch>
                    <Route exact path='/' component={FrontPage} />
                    <Route path='/explore' render={(routerProps) => (
                    <SearchAndResults {...routerProps} errMessage={this.state.error} upperContainerPropList={upperContainerProp} nResult={this.state.nFiltered} cardContainerPropList={cardContainerProp} loadStatus={this.state.dataLoaded}/>
                    )} />
                    <Redirect to='/' />
                </Switch>    
                {/*<main>
                    <UpperContainer propList={upperContainerProp} />
                    <ShowError msg={this.state.error}/>
                    <NumberOfResult nResult={this.state.nFiltered} />
                    {!this.state.dataLoaded &&
                        <FontAwesomeIcon icon={faPalette} className='fa-palette' spin/>
                    }
                    <CardContainer propList={cardContainerProp} />
                </main>*/}
                {/*abv part should be included into one route */}
                <SelectedPanel propList={selectedPanelProp} />
                <Footer />
            </div>
        );
    }
}

export default App;


class SearchAndResults extends Component {
    render() {
        let errMessage = this.props.errMessage;
        //let propList = this.props.propList;
        let upperContainerPropList = this.props.upperContainerPropList;
        let cardContainerPropList = this.props.cardContainerPropList;
        let nResult = this.props.nResult;
        let isloaded = this.props.loadStatus;
        return (
            <div>
                <UpperContainer propList={upperContainerPropList} />
                <ShowError msg={errMessage}/>
                <NumberOfResult nResult={nResult} />
                {!isloaded &&
                    <FontAwesomeIcon icon={faPalette} className='fa-palette' spin/>
                }
                <CardContainer propList={cardContainerPropList} />
            </div>
        )
    }  
}

class NavBar extends Component {
    render() {
        return (
            <nav>
                <NavTabs handleApply={this.props.handleApply}/>
                <div className='hamburger-menu' onClick={this.props.handleMobileMenu}>
                    <div id='menu-unclicked'>
                        <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                    </div>
                </div>
            </nav>
        );
    }
}

class MobileNav extends Component {
    render() {
        let menu;
        if (this.props.propList.mobileMenuOn) {
            menu = (<aside>
                        <div className='hamburger-menu' onClick={this.props.propList.handleMobileMenu}>
                            <div id='menu-clicked'>
                                <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                            </div>
                        </div>
                        <NavTabs handleApply={this.props.propList.handleApply}/>
                    </aside>);
        } else {
            menu = <div></div>;
        }

        return menu;
    }
}

class NavTabs extends Component {
    render() {
        return (
            <div>
                <div className='home navigate'><NavLink exact to="/" className="navigate" activeClassName='selectedtab'>Home</NavLink></div>
                <div className='create navigate'><NavLink exact to="/create" className="navigate" activeClassName='selectedtab'>Create</NavLink></div>
                <div className='explore navigate'><NavLink exact to="/explore" className="navigate" activeClassName='selectedtab'>Explore</NavLink></div>
                <div className='apply navigate' onClick={this.props.handleApply}>Apply</div>
            </div>
        );
    }
}

class UpperContainer extends Component {
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

class ShowError extends Component {
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

class SelectedPanel extends Component {
    render() {
        if (this.props.propList.selected) {
            let optionLabels = [{id: 1, color: 'light shade'}, {id: 2, color: 'light accent'}, {id: 3, color: 'main color'},
            {id: 4, color: 'dark accent'}, {id: 5, color: 'dark shade'}];

            let optionContainerProp = {palette: this.props.propList.palette, handleLock: this.props.propList.handleLock};
            let optionContainers = optionLabels.map(x => <OptionContainer label={x} key={'option' + x.id} propList={optionContainerProp}
                locked={this.props.propList.lockStatus[x.id - 1]} />);

            let selectedPalette = optionLabels.map(x => <SelectedPalette colorId={x.id} key={'color' + x.id} 
                palette={this.props.propList.palette} />);
            return (
                <div id="selectedpanel">
                    <div id="selectedpalette" aria-label="selected palette">
                        {selectedPalette}
                    </div>
                    <div id="coloroption">
                        {optionContainers}
                    </div>
                </div>
            );
        }
        return (
            <div></div>
        );
    }
}

class SelectedPalette extends Component {
    render() {
        let color = {backgroundColor: this.props.palette[this.props.colorId - 1]};
        return (
            <div className="color" id={'color' + this.props.colorId} style={color}></div>
        );
    }
}

class OptionContainer extends Component {
    handleClick = () => {
        let filter = convert.hex.keyword(this.props.propList.palette[this.props.label.id - 1]);
        this.props.propList.handleLock(filter, this.props.label.id - 1);
    }

    render() {
        let className = 'lock';
        if (this.props.locked) {
            className += ' locked';
        }

        return (
            <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + this.props.label.color} aria-live="polite">
                    {this.props.propList.palette[this.props.label.id - 1]}
                </p>
                <button className={className} id={'lock' + this.props.label.id} aria-label="color lock" aria-pressed="true" 
                onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faLock} className='fa-lock' aria-label='menu' />
                </button>
            </div>
        );
    }
}

class Footer extends Component {
    render() {
        return (
            <footer>
                <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
                <address>Contact: <a href='mailto:ghcho@uw.edu'>ghcho@uw.edu</a> 
                    |  <a href='mailto:jz73@uw.edu'>jz73@uw.edu</a></address>
            </footer>
        );
    }
}

class CardContainer extends Component {
    render() {
        let paletteCards = this.props.propList.filteredData.map(x => <PaletteCard palette={x} handleSelectPalette={this.props.propList.handleClick} 
            handleResetLock={this.props.propList.handleResetLock}/>)

        return (
            <section id="cardcontainer">
                {paletteCards}
            </section>
        );
    }
}

class PaletteCard extends Component {
    handleClick = () => {
        let colors = [this.props.palette.light_shade, this.props.palette.light_accent, this.props.palette.main, 
            this.props.palette.dark_accent, this.props.palette.dark_shade];
        this.props.handleResetLock();
        this.props.handleSelectPalette(colors);
    }

    render() {
        let colors = [this.props.palette.light_shade, this.props.palette.light_accent, this.props.palette.main, 
            this.props.palette.dark_accent, this.props.palette.dark_shade];
        
        colors = colors.map(x => <PaletteCardColor color={x} />);

        return (
            <div className="palette" aria-label="color palette" onClick={this.handleClick}>
                <div className="setinfo">
                    <p className="author">{'Created by ' + this.props.palette.username}</p>
                    <div className="colorcontainer">
                        {colors}
                    </div>
                </div>
            </div>
        );
    }
}

class PaletteCardColor extends Component {
    render() {
        let bgcolor = {backgroundColor: this.props.color};
        return (
            <div className="color" style={bgcolor}></div>
        );
    }
}

class NumberOfResult extends Component {
    render() {
        return (
            <p id="nPalettes" aria-label="number of search results" aria-live="polite">
                {this.props.nResult + ' results found'}
            </p>
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