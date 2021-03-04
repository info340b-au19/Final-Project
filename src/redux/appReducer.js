import {
  APPLY,
  MOBILE,
  HANDLE_SELECTED_PALETTE,
  SWITCHS_ELECTED,
 // SWITCHS_ELECTED,
} from "./navActions";
//import { Switch } from 'react-router-dom';

const initial_state = {
  mobileMenuOn: false,
  selected: false,
  selectedPalette: ["#ffffff", "#818181", "#ff6f61", "#836e58", "#232326"],
  currentTheme: ["#ffffff", "#818181", "#ff6f61", "#836e58", "#232326"],
};

/**
 * Reducer for navigate.js page
 * @param {object} state
 * @param {object} action
 */
function navReducer(state = initial_state, action) {
  switch (action.type) {
    case APPLY:
      console.log(
        "printing from Navreducer: action type is",
        action.type,
        "---------------------"
      )
      return {
        ...state,
        currentTheme: state.selectedPalette,
        selected: false,
      }
    case MOBILE:
      console.log(
        "printing from Navreducer: action type is",
        action.type,
        "-----------------"
      )
      let mobileNow = !state.mobileMenuOn;
      return {
        ...state,
        mobileMenuOn: mobileNow,
      }

    case SWITCHS_ELECTED:
      console.log(
        "SWITCH_SELECTED triggered and selected should now be:",
        action.newSelectedStatus
      )
      return {
        ...state,
        selected: action.newSelectedStatus
      }

    case HANDLE_SELECTED_PALETTE:
      console.log(
        "HANDLE_SELECTED_PALETTE triggered and selected should now be:",
        action.selected
      )
      return {
        ...state,
        selectedPalette: action.pallete,
        selected: action.selected,
      }

    default:
      return state;
  }
}

export default navReducer;
