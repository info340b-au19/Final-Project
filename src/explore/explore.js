import React, { Component } from 'react';
import {UpperContainer, ShowError} from './exploreUpper.js';
import {SelectedPanel} from './exploreSelected.js';
import {NumberOfResult, CardContainer} from './explorePalettes.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPalette} from '@fortawesome/free-solid-svg-icons';

export class Explore extends Component {
    render() {
        return (
            <main>
                <UpperContainer propList={this.props.propList.upperContainerProp} />
                <ShowError msg={this.props.propList.error}/>
                <NumberOfResult nResult={this.props.propList.nFiltered} />
                {!this.props.propList.dataLoaded &&
                    <FontAwesomeIcon icon={faPalette} className='fa-palette' spin/>
                }
                <CardContainer propList={this.props.propList.cardContainerProp} />
                <SelectedPanel propList={this.props.propList.selectedPanelProp} />
            </main>
        );
    }
}