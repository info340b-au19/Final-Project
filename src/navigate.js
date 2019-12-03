import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export class NavBar extends Component {
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

export class MobileNav extends Component {
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
                <div className='home navigate'>Home</div>
                <div className='create navigate'>Create</div>
                <div className='explore selectedtab navigate'>Explore</div>
                <div className='apply navigate' onClick={this.props.handleApply}>Apply</div>
            </div>
        );
    }
}