import React, { Component } from 'react';
import './index.css';
import {NavBar, MobileNav} from './navigate.js';
import {Explore} from './explore/explore.js';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import {Create} from './create/create.js';

// main component
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {mobileMenuOn: false, selected: false, 
        selectedPalette: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326'], currentTheme: ['#ffffff', '#818181', '#ff6f61', '#836e58', '#232326']};
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
        console.log('h');
        
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
        let style = { '--lightShade': this.state.currentTheme[0], '--lightAccent': this.state.currentTheme[1], 
        '--mainColor': this.state.currentTheme[2], '--darkAccent': this.state.currentTheme[3], 
        '--darkShade': this.state.currentTheme[4]};
    
        let mobileNavProp = {handleApply: this.handleApplyClick, mobileMenuOn: this.state.mobileMenuOn, handleMobileMenu: this.handleMobileMenu}
        
        let exploreProp = {handleSelectPalette: this.handleSelectPalette, handleApplyClick: this.handleApplyClick, selectedPalette: this.state.selectedPalette,
            currentTheme: this.state.currentTheme, selected: this.state.selected};
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
                    <Route path='/explore' render={() => <Explore propList={exploreProp}/>}/>
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