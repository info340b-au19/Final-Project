import React, { Component } from 'react';
import './index.css';
//import * as d3 from 'd3';
//import palettesData from './palettes.csv';
import FrontPage from './Front';
//import * as convert from 'color-convert'; // for converting color values
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import { Create } from './create/create.js';
import { Explore } from './explore/explore.js';
import { NavBar, MobileNav } from './common/navigate.js';


// main component
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {mobileMenuOn: false, selected: false, 
        selectedPalette: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326']};
        /*this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, selected: false, error: '', mobileMenuOn: false,
        selectedPalette: [], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], dataLoaded: false,
        filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''};*/
    }

    // selecte a palette
    handleSelectPalette = (palette) => {
        if (!this.state.selected) {
            this.setState({selected: true});
        }
        this.setState({ selectedPalette: palette });
    }

    // apply selected theme when apply tab is clicked
    handleApplyClick = () => {
        if (this.state.selected) {
            this.setState({ currentTheme: this.state.selectedPalette, selected: false });
        }
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
        /*let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
    
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        
        let exploreProp = {handleSelectPalette: this.handleSelectPalette, handleApplyClick: this.handleApplyClick, selectedPalette: this.state.selectedPalette,
            currentTheme: this.state.currentTheme, selected: this.state.selected};*/
        let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
    
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        
        let exploreProp = {handleSelectPalette: this.handleSelectPalette, handleApplyClick: this.handleApplyClick, selectedPalette: this.state.selectedPalette,
            currentTheme: this.state.currentTheme, selected: this.state.selected};
        
        /*let upperContainerProp = {filterList: this.state.filterList, handleAddFilter: this.handleAddFilter, handleSearch: this.handleUpdateQuery,
            searchQuery: this.state.searchQuery, handleLock: this.handleUpdateLock, handleRemoveFilter: this.handleRemoveFilter,
            selectedPalette: this.state.selectedPalette, handleError: this.handleError};
        
        let cardContainerProp = {filteredData: this.state.filteredPalettes, handleClick: this.handleSelectPalette, 
            handleResetLock: this.handleResetLock};

        let selectedPanelProp = {selected: this.state.selected, palette: this.state.selectedPalette, handleLock: this.handleUpdateLock, 
            lockStatus: this.state.lockStatus}
        
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}*/
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
                    <Route path='/create' render={() => <Create selectedPalette={this.state.selectedPalette} handleCreateChange={this.handleCreateChange}/>}/>
                    <Route path='/explore' render={() => <Explore propList={exploreProp}/>} />
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
                {/*<SelectedPanel propList={selectedPanelProp} />*/}
                <Footer />
            </div>
        );
    }
}

export default App;

/*
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
*/
class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Powered by <a href='https://casesandberg.github.io/react-color/'>React Color</a> | <a href='https://github.com/Qix-/color-convert#readme'>Color-Convert</a></p>
                <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
                <address>Contact: <a href='mailto:ghcho@uw.edu'>ghcho@uw.edu</a> |  <a href='mailto:jz73@uw.edu'>jz73@uw.edu</a></address>
            </footer>
        );
    }
}
/*
class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Powered by <a href='https://casesandberg.github.io/react-color/'>React Color</a> | <a href='https://github.com/Qix-/color-convert#readme'>Color-Convert</a></p>
                <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
                <address>Contact: <a href='mailto:ghcho@uw.edu'>ghcho@uw.edu</a> |  <a href='mailto:jz73@uw.edu'>jz73@uw.edu</a></address>
            </footer>
        );
    }
}*/