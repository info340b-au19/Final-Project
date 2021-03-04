import React, { Component } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {handleResetLock} from '../redux/exploreActions'
import {handleSelectPalette} from '../redux/navActions'


export const CardContainer = () => {
    let paletteCards = useSelector(state => state.explore.filteredPalettes).map(x => <PaletteCard palette={x}/>)
    return(
        <section id='cardcontainer'>
            {paletteCards}
        </section>
    );

}

function PaletteCard({palette}) {
    let dispatch = useDispatch();
    function handleClick() {
        let colors = [palette.light_shade, palette.light_accent, palette.main, 
            palette.dark_accent, palette.dark_shade];
        dispatch(handleResetLock);
        dispatch(handleSelectPalette(colors))
    }

    let colorsOnThisPallete = [palette.light_shade, palette.light_accent, palette.main, 
        palette.dark_accent, palette.dark_shade];
    colorsOnThisPallete = colorsOnThisPallete.map(x => <PaletteCardColor color={x}/>)

    return (
        <div className="palette" aria-label="color palette" onClick={handleClick}>
        <div className="setinfo">
            <p className="author">{'Created by ' + palette.username}</p>
            <div className="colorcontainer">
                {colorsOnThisPallete}
            </div>
        </div>
    </div>
    )
}
 


class PaletteCardColor extends Component {
    render() {
        let bgcolor = {backgroundColor: this.props.color};
        return (
            <div className="color" style={bgcolor}></div>
        );
    }
}

export const NumberOfResult = () => {
    let nResult = useSelector(state => state.explore.nFiltered)
    return (
        <p id="nPalettes" aria-label="number of search results" aria-live="polite">
        {nResult + ' results found'}
        </p>
    )
}

/*
export class NumberOfResult extends Component {
    render() {
        return (
            <p id="nPalettes" aria-label="number of search results" aria-live="polite">
                {this.props.nResult + ' results found'}
            </p>
        );
    }
}*/