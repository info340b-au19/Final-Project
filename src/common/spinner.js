import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPalette} from '@fortawesome/free-solid-svg-icons';

export class Spinner extends Component {
    render() {
        return <FontAwesomeIcon icon={faPalette} className='fa-palette' spin/>;
    }
}