import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import * as convert from 'color-convert';

export class SelectedPanel extends Component {
    render() {
        if (this.props.propList.selected) {
            let optionLabels = [{id: 0, color: 'light shade'}, {id: 1, color: 'light accent'}, {id: 2, color: 'main color'},
            {id: 3, color: 'dark accent'}, {id: 4, color: 'dark shade'}];

            let optionContainerProp = {palette: this.props.propList.palette, handleLock: this.props.propList.handleLock};
            let optionContainers = optionLabels.map(x => <OptionContainer label={x} key={'option' + x.id} propList={optionContainerProp}
                locked={this.props.propList.lockStatus[x.id]} />);

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
        let color = {backgroundColor: this.props.palette[this.props.colorId]};
        return (
            <div className="color" id={'color' + this.props.colorId} style={color}></div>
        );
    }
}

class OptionContainer extends Component {
    handleClick = () => {
        let filter = convert.hex.keyword(this.props.propList.palette[this.props.label.id]);
        this.props.propList.handleLock(filter, this.props.label.id);
    }

    render() {
        let className = 'lock';
        if (this.props.locked) {
            className += ' locked';
        }

        return (
            <div className="optioncontainer">
                <p className="hex" aria-label={'selected ' + this.props.label.color} aria-live="polite">
                    {this.props.propList.palette[this.props.label.id]}
                </p>
                <button className={className} id={'lock' + this.props.label.id} aria-label="color lock" aria-pressed="true" 
                onClick={this.handleClick}>
                    <FontAwesomeIcon icon={faLock} className='fa-lock' aria-label='menu' />
                </button>
            </div>
        );
    }
}