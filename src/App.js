import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import * as d3 from 'd3';
import palettesData from './palettes.csv';
import * as convert from 'color-convert';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, selected: false,
        selectedPalette: [], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'],
        filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''};
    }

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
        });
    }

    handleSelectPalette = (palette) => {
        
        this.setState({ selected: true });
        this.setState({ selectedPalette: palette });
        
    }

    handleApplyClick = () => {
        console.log('clicked');
        if (this.state.selected) {
            this.setState({ currentTheme: this.state.selectedPalette });
        }
    }

    addFilter = (filter) => {
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

    removeFilter = (filter) => {
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

    updateLock = (filter, lockId) => {
        let currLockStatus = this.state.lockStatus;
        
        let selectedColorNames = this.state.selectedPalette.map(x => convert.hex.keyword(x));
        let lockColor = selectedColorNames[lockId];
        for (let i = 0; i < 5; i++) {
            if (lockColor == selectedColorNames[i]) {
                currLockStatus[i] = !currLockStatus[i];
            }
        }
        if (currLockStatus[lockId]) {
            this.addFilter(filter);
        } else {
            this.removeFilter(filter);
        }
        
        this.setState({ lockStatus: currLockStatus });
    }

    updateQuery = (input) => {
        let cleanedInput = input.toLowerCase().replace(/\s+/g, '');
        this.setState({ searchQuery: cleanedInput });
    }

    render() {
        let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
        return (
            
            <div className='appContainer' style={style}>
                <header>
                    <h1>acryline</h1>
                </header>
                <NavBar handleApply={this.handleApplyClick}/>
                <MobileNav />
                <main>
                    <UpperContainer filterList={this.state.filterList} handleAddFilter={this.addFilter} handleSearch={this.updateQuery}
                    searchQuery={this.state.searchQuery} handleLock={this.updateLock} handleRemoveFilter={this.removeFilter}
                    selectedPalette={this.state.selectedPalette} />
                    <p id="error" role="alert"></p>
                    <NumberOfResult nResult={this.state.nFiltered} />
                    <CardContainer filteredData={this.state.filteredPalettes} handleClick={this.handleSelectPalette} />
                </main>
                <SelectedPanel selected={this.state.selected} palette={this.state.selectedPalette} handleLock={this.updateLock} 
                lockStatus={this.state.lockStatus} />
                <Footer />
            </div>
        );
    }
}

export default App;

class NavBar extends Component {
    render() {
        return (
            <nav>
                <NavTabs  handleApply={this.props.handleApply}/>
                <div className='hamburger-menu'>
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
        return (
            <aside>
                <div className='hamburger-menu'>
                    <div id='menu-clicked'>
                        <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                    </div>
                </div>
                <NavTabs />
            </aside>
        );
    }
}

class NavTabs extends Component {
    render() {
        return (
            <div>
                <div className='home navigate'>Home</div>
                <div className='create navigate'>Create</div>
                <div className='explore selectedtab navigate'>Explore</div>
                <div className='apply navigate' onClick={this.props.handleApply}>Apply</div>
            </div>
        );
    }
}

class UpperContainer extends Component {
    render() {
        return (
            <section id="uppercontainer">
                <h2>Explore Other Creations</h2>
                <div id="searchcontainer">
                    <SearchBox handleAddFilter={this.props.handleAddFilter} handleSearch={this.props.handleSearch} 
                    searchQuery={this.props.searchQuery} handleLock={this.props.handleLock} selectedPalette={this.props.selectedPalette}/>
                    <FilterContainer filterList={this.props.filterList} handleLock={this.props.handleLock} 
                    handleRemoveFilter={this.props.handleRemoveFilter} selectedPalette={this.props.selectedPalette}/>
                </div>
            </section>
        );
    }
}

class SelectedPanel extends Component {
    render() {
        if (this.props.selected) {
            let optionLabels = [{id: 1, color: 'light shade'}, {id: 2, color: 'light accent'}, {id: 3, color: 'main color'},
            {id: 4, color: 'dark accent'}, {id: 5, color: 'dark shade'}];
            let optionContainers = optionLabels.map(x => <OptionContainer label={x} key={'option' + x.id} palette={this.props.palette} 
            handleLock={this.props.handleLock} locked={this.props.lockStatus[x.id - 1]}/>);
            let selectedPalette = optionLabels.map(x => <SelectedPalette colorId={x.id} key={'color' + x.id} palette={this.props.palette} />);
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
        let filter = convert.hex.keyword(this.props.palette[this.props.label.id - 1]);
        this.props.handleLock(filter, this.props.label.id - 1);
    }

    render() {
        let className = 'lock';
        if (this.props.locked) {
            className += ' locked';
        }
        
        return (
            <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + this.props.label.color} aria-live="polite">
                    {this.props.palette[this.props.label.id - 1]}
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
        let paletteCards = this.props.filteredData.map(x => <PaletteCard palette={x} handleSelectPalette={this.props.handleClick} />)

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
        this.props.handleSearch(e.target.value)
    }

    handleClick = (e) => {
        e.preventDefault();
        let filter = this.props.searchQuery;
        
        let selectedColorNames = this.props.selectedPalette.map(x => convert.hex.keyword(x));
        let lockId = selectedColorNames.indexOf(filter);
        if (lockId != -1) {
            this.props.handleLock(filter, lockId);
        }
        this.props.handleAddFilter(filter)
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
        let filters = this.props.filterList.map(x => <Filter filterText={x} handleLock={this.props.handleLock}
        handleRemoveFilter={this.props.handleRemoveFilter} selectedPalette={this.props.selectedPalette}/>);

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
        
        let selectedColorNames = this.props.selectedPalette.map(x => convert.hex.keyword(x));
        let lockId = selectedColorNames.indexOf(filter);
        if (lockId != -1) {
            this.props.handleLock(filter, lockId);
        }
        this.props.handleRemoveFilter(filter);
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