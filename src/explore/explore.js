import React, { useEffect } from "react";
import { UpperContainer } from "./exploreUpper.js";
import { SelectedPanel } from "./exploreSelected.js";
import { NumberOfResult, CardContainer } from "./explorePalettes.js";
import { Spinner } from "../common/spinner.js";
import { AlertBox } from "../common/alertBox.js";
import { useDispatch, useSelector } from "react-redux";
import { handleFirebaseLoad } from "../redux/exploreActions";
//import store from "../redux/store";
import firebase from "firebase/app";
import "firebase/database";
import "./explore.css";

export const Explore = () => {
  let palettesRef;
  let dispatch = useDispatch();
  useEffect(() => {
    palettesRef = firebase.database().ref("palettes");
    palettesRef.on("value", (snapshot) => {
      let palettesList = Object.keys(snapshot.val());
      palettesList = palettesList.map((key) => {
        let paletteObj = snapshot.val()[key];
        paletteObj["id"] = key;
        return paletteObj;
      });
      dispatch(handleFirebaseLoad(palettesList));
    });
  }, []);
  let loadStatus = useSelector(state => state.explore.dataLoaded);
  let err = useSelector(state => state.explore.error);
  return (
    <main>

        <UpperContainer />
        <AlertBox msg={err} />
        <NumberOfResult />
        {!loadStatus && <Spinner />}
        <CardContainer />
        <SelectedPanel />
    </main>
  );
};

/*
export class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {palettes: [], filteredPalettes: [], nFiltered: 0, error: '', 
            dataLoaded: false, filterList: [], lockStatus: [false, false, false, false, false], searchQuery: ''}
    }

    componentDidMount() {
        this.palettesRef = firebase.database().ref('palettes');
        this.palettesRef.on('value', (snapshot => {
            
            let palettesList = Object.keys(snapshot.val());
            palettesList = palettesList.map((key) => {
                let paletteObj = snapshot.val()[key];
                paletteObj['id'] = key;
                return paletteObj;
            })
            let dispatch = useDispatch();
            dispatch(handleFirebaseLoad(palettesList));
            this.setState({dataLoaded: true});
        }));
    }

    componentWillUnmount() {
        this.palettesRef.off();
    }


    render() {
        let selectedPanelProp = {selected: this.props.propList.selected, palette: this.props.propList.selectedPalette, handleLock: this.handleUpdateLock, 
            lockStatus: this.state.lockStatus}

        return (
            <main>
                <Provider store={store}>
                    <UpperContainer/>
                    <AlertBox msg={this.state.error}/>
                    <NumberOfResult/>
                    {!this.state.dataLoaded && <Spinner />}
                    <CardContainer/>
                    <SelectedPanel propList={selectedPanelProp} />
                </Provider>
            </main>
        );
    }
}*/
