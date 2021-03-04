import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { applyChange, switchMobile } from '../redux/navActions';
//import { dispatch } from 'd3';

export const NavBar = () => {
    let dispatch = useDispatch();
    return(
        <nav>
            <NavTabs/>
            <div className='hambuger-menu' onClick={() => dispatch(switchMobile())}>
                <div id='menu-unclicked'>
                    <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                </div>
            </div>
        </nav>
    )
};
/*
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
}*/

export const MobileNav = () => {
    let isOn = useSelector(state => state.navigate.mobileMenuOn)
    let dispatch = useDispatch()
    let menu;
    if (isOn) {
        menu = (<aside>
                    <div className='hamburger-menu' onClick={() => dispatch(switchMobile())}>
                        <div id='menu-clicked'>
                            <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                        </div>
                    </div>
                    <NavTabs/>
                </aside>);
    } else {
        menu = <div></div>;
    }
    return menu;
};
/*
export class MobileNav extends Component {
    render() {
        let isOn = useSelector(state => state.mobileMenuOn)
        let menu;
        if (isOn) {
            menu = (<aside>
                        <div className='hamburger-menu' onClick={() => dispatch(switchMobile())}>
                            <div id='menu-clicked'>
                                <FontAwesomeIcon icon={faBars} className='fa-bars' aria-label='menu' />
                            </div>
                        </div>
                        <NavTabs/>
                    </aside>);
        } else {
            menu = <div></div>;
        }

        return menu;
    }
}*/

function NavTabs() {
    let dispatch = useDispatch()
    return(
        <div>
            <NavLink exact to='/' activeClassName='active' className='home navigate'>Home</NavLink>
            <NavLink exact to='/create' activeClassName='active' className='create navigate'>Create</NavLink>
            <NavLink exact to='/explore' activeClassName='active' className='explore navigate'>Explore</NavLink>
            <div className='apply navigate' onClick={() => dispatch(applyChange())}>Apply</div>
        </div> 
    )
}

/*
class NavTabs extends Component {
    render() {
        return (
            <div>
                <NavLink exact to='/' activeClassName='active' className='home navigate'>Home</NavLink>
                <NavLink exact to='/create' activeClassName='active' className='create navigate'>Create</NavLink>
                <NavLink exact to='/explore' activeClassName='active' className='explore navigate'>Explore</NavLink>
                <div className='apply navigate' onClick={this.props.handleApply}>Apply</div>
            </div>
        );
    }
}*/