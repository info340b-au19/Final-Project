import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import '../index.css';

export class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {currentColor: '#ff6f61', activeColor: [false, false, true, false, false], 
            description: {type: 'Main Color', p1: 'This color shows the identity of your design.', 
                p2: 'Look for a color that is both striking and easy on the eye.'}}
    }

    handleClickColor = (color, index) => {
        let newActiveColor = [false, false, false, false, false];
        newActiveColor[index] = !newActiveColor[index];
        let newDescription = {};
        if (index == 0) {
            newDescription = {type: 'Light Shade', p1: 'This will be the lightest color of your design.', 
                p2: 'Light background and texts on dark background should look great with this color.'};
        } else if (index == 1) {
            newDescription = {type: 'Light Accent', p1: 'This color can be used to attract certain element of your design.', 
                p2: 'Look for a color that is contrasting with the rest of your design.'};
        } else if (index == 2) {
            newDescription = {type: 'Main Color', p1: 'This color shows the identity of your design.', 
                p2: 'Look for a color that is both striking and easy on the eye.'};
        } else if (index == 3) {
            newDescription = {type: 'Dark Accent', p1: 'This is the second accent color for your design.', 
                p2: 'Look for a color that is contrasting with the rest of your design.'};
        } else {
            newDescription = {type: 'Dark Shade', p1: 'This will be the darkest color of your design.', 
                p2: 'Dark background and texts on light background should look great with this color.'};
        }
        this.setState({currentColor: color, activeColor: newActiveColor, description: newDescription});

    }

    handleChange = (color) => {
        this.setState({currentColor: color.hex});
        this.props.handleCreateChange(color.hex, this.state.activeColor.indexOf(true));
    }

    render() {
        let selectedPalette = [];
        for (let i = 0; i < this.props.selectedPalette.length; i++) {
            selectedPalette.push(<SelectedPalette color={this.props.selectedPalette[i]} colorId={i} 
                handleClickColor={this.handleClickColor} active={this.state.activeColor[i]}/>);
        }
        let indicators = this.state.activeColor.map(state => <ShowSelected active={state} color={this.state.currentColor}/>);
        return (
            <main>
                <section id="uppercontainer">
                    <h2>Create Your Palette</h2>
                </section>
                <section id='createcontainer'>
                    <div id='savepalette'>
                        <form className="savebox" action="">
                            <input type='text' id='createname' placeholder='Type your artist name to save' aria-label="name input"/>
                            <button type='submit' id='savebutton' aria-label="save palette">Save</button>
                        </form>
                    </div>
                    <div className='createcolor'>
                        {selectedPalette}
                    </div>
                    <section id='showselectedcontainer'>
                        {indicators}
                    </section>
                    <div id='colorpicker'>
                        <Description description={this.state.description}/>
                        <ChromePicker disableAlpha={true} color={this.state.currentColor} onChange={this.handleChange}/>
                    </div>
                </section>
            </main>
        );
    }
}

class SelectedPalette extends Component {
    handleClick = () => {
        this.props.handleClickColor(this.props.color, this.props.colorId);
    }

    render() {
        let color = {backgroundColor: this.props.color};
        return (
            <div className="color" style={color} onClick={this.handleClick}></div>
        );
    }
}

class ShowSelected extends Component {
    render() {
        if (!this.props.active) {
            return <div className='selectedindicator'></div>;
        }
        let style = {backgroundColor: this.props.color, boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.12)'};
        return <div className='selectedindicator' style={style}></div>
    }
}

class Description extends Component {
    render() {
        return (
            <div id='colordescription'>
                <h3>{this.props.description.type}</h3>
                <p>{this.props.description.p1}</p>
                <p>{this.props.description.p2}</p>
            </div>
        );
    }
}