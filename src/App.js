import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import * as d3 from 'd3';
import palettesData from './palettes.csv';
import colorNameData from './color_names.csv'

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], colorNames: [], filteredPalettes: [], nFiltered: 0, selected: false,
        selectedPalette: []};
    }

    componentDidMount() {
        d3.csv(colorNameData, (colorNameData) => {
            this.setState({colorNames: colorNameData});
        });
        d3.csv(palettesData, (palettesData) => {
            this.setState({palettes: palettesData});
            this.setState({filteredPalettes: palettesData});
            this.setState({nFiltered: palettesData.length})
        });
    }

    handleSelectPalette = (palette) => {
        
        this.setState({ selected: true });
        this.setState({ selectedPalette: palette });
        
    }

    render() {
        return (
            <div>
                <header>
                    <h1>acryline</h1>
                </header>
                <NavBar />
                <MobileNav />
                <main>
                    <UpperContainer />
                    <p id="error" role="alert"></p>
                    <NumberOfResult nResult={this.state.nFiltered} />
                    <CardContainer filteredData={this.state.filteredPalettes} handleClick={this.handleSelectPalette} />
                </main>
                <SelectedPanel selected={this.state.selected} palette={this.state.selectedPalette} />
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
                <NavTabs />
                <div className='hamburger-menu'>
                    <a id='menu-unclicked' href=''>
                        <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                    </a>
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
                    <a id='menu-clicked' href=''>
                        <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                    </a>
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
                <a href='' className='home navigate'>Home</a>
                <a href='' className='create navigate'>Create</a>
                <a href='' className='explore selectedtab navigate'>Explore</a>
                <a href='' className='apply navigate'>Apply</a>
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
                    <form className="searchbox" action="">
                        <input type="text" id="searchinput" placeholder="Search..." aria-label="search input" />
                        <button type="submit" id="searchbutton">
                            <FontAwesomeIcon icon={faSearch} className='fa-search' aria-hidden="true" />
                        </button>
                    </form>
                </div>
                <div id="filterContainer"></div>
            </section>
        );
    }
}

class SelectedPanel extends Component {
    render() {
        if (this.props.selected) {
            let optionLabels = [{id: 1, color: 'light shade'}, {id: 2, color: 'light accent'}, {id: 3, color: 'main color'},
            {id: 4, color: 'dark accent'}, {id: 5, color: 'dark shade'}];
            let optionContainers = optionLabels.map(x => <OptionContainer label={x} key={'option' + x.id} palette={this.props.palette} />);
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
    render() {
        
        return (
            <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + this.props.label.color} aria-live="polite">
                    {this.props.palette[this.props.label.id - 1]}
                </p>
                <button className="lock" id={'lock' + this.props.label.id} aria-label="color lock" aria-pressed="true">
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


//abondoned//

// import React, { Component } from 'react'; //import React Component

// export class App extends React.Component {
//     render() {
//         return (
//             // <head>
//             //     <meta charset="utf-8" />
//             //     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
//             //     <meta name="author" content="Gunhyung Cho, Jiuzhou Zhao" />
//             //     <meta name="description" content="users can look for other people's shared palettes with search box and color lock feature" />
//             //     <meta name="keywords" content="design, graphic, illustration, color" />
//             //     <title>acryline</title>
//             //     <link rel="stylesheet" href="css/style.css" />
//             //     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
//             //     <link href="https://fonts.googleapis.com/css?family=Oxygen:400,700&amp;display=swap" rel="stylesheet" />
//             // </head>
//             <div className="container">
//                 <Header />
//                 <Body />
//             </div>
//         );
//     }
// }

// class Header extends React.component {
//     render() {
//         return(
//             <head>
//                 <meta charset="utf-8" />
//                 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
//                 <meta name="author" content="Gunhyung Cho, Jiuzhou Zhao" />
//                 <meta name="description" content="users can look for other people's shared palettes with search box and color lock feature" />
//                 <meta name="keywords" content="design, graphic, illustration, color" />
//                 <title>acryline</title>
//                 <link rel="stylesheet" href="css/style.css" />
//                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
//                 <link href="https://fonts.googleapis.com/css?family=Oxygen:400,700&amp;display=swap" rel="stylesheet" />
//             </head> 
//         );        
//     }
// }

// class Body extends React.component {
//     render() {
//         return(
//             <body>
//                 <header>
//                     <h1>acryline</h1>
//                 </header>
//                 <NAV />
//                 <ASIDE />
//                 <MAIN />
//                 <SelectedPanel />
//                 <footer>
//                     <p>© 2019 Gunhyung Cho  |  Jiuzhou Zhao</p>
//                     <address>Contact: <a href="mailto:ghcho@uw.edu">ghcho@uw.edu</a> 
//             |       <a href="mailto:jz73@uw.edu">jz73@uw.edu</a></address>
//                 </footer>
//             </body>
//         );
//     }
// }


// class NAV extends React.component {
//     render() {
//         let classesAndText = this.props.classesAndText;
//         let 
//         return(

//         );
//     }
// }

// class NavOptions extends React.component {
//     render() {
//         let thisClass = this.props.thisClass;
//         let thisText = this.props.thisText;
//         return(
//             <a href="#" className={thisClass}>{thisText}</a>
//         );
//     }
// }