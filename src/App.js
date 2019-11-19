import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './index.css';

export class App extends Component {
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
                    <p id="nPalettes" aria-label="number of search results" aria-live="polite"></p>
                    <section id="cardcontainer">
                    </section>
                </main>
                <SelectedPanel />
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
        let optionLabels = [{id: 1, color: 'light shade'}, {id: 2, color: 'light accent'}, {id: 3, color: 'main color'},
        {id: 4, color: 'dark accent'}, {id: 5, color: 'dark shade'}];
        let optionContainers = optionLabels.map(x => <OptionContainer label={x} key={'option' + x.id}/>);
        let selectedPalette = optionLabels.map(x => <SelectedPalette id={x.id} key={'color' + x.id}/>);

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
}

class SelectedPalette extends Component {
    render() {
        return (
            <div className="color" id={'color' + this.props.id}></div>
        );
    }
}

class OptionContainer extends Component {
    render() {
        return (
            <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + this.props.label.color} aria-live="polite"></p>
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