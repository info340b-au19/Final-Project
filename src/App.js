import React, { Component } from "react";
import "./index.css";
import { NavBar, MobileNav } from "./common/navigate.js";
import { Explore } from "./explore/explore.js";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Create } from "./create/create.js";
import { FrontPage } from "./home/front.js";
import { useSelector } from "react-redux";
// main component

export const App = () => {
  let handleCreateChange = (color, index) => {
    let newSelectedPalette = this.state.selectedPalette;
    newSelectedPalette[index] = color;
    this.setState({ selectedPalette: newSelectedPalette, selected: true });
  };
  let currTheme = useSelector((state) => state.navigate.currentTheme);
  let selectedPalette = useSelector(
    (state) => state.navigate.selectedPalette
  );

  let style = {
    "--lightShade": currTheme[0],
    "--lightAccent": currTheme[1],
    "--mainColor": currTheme[2],
    "--darkAccent": currTheme[3],
    "--darkShade": currTheme[4],
  };

  return (
    <div className="appContainer" style={style}>
      <header>
        <Link exact to="/">
          <h1>acryline</h1>
        </Link>
      </header>
      <NavBar />
      <MobileNav />
      <Switch>
        <Route exact path="/" component={FrontPage} />
        <Route
          path="/create"
          render={() => (
            <Create
              selectedPalette={selectedPalette}
              handleCreateChange={handleCreateChange}
            />
          )}
        />
        <Route path="/explore" render={() => <Explore />} />
        <Redirect to="/"></Redirect>
      </Switch>
      <Footer />
    </div>
  );
};
/*
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenuOn: false,
      selected: false,
      selectedPalette: ["#ffffff", "#818181", "#ff6f61", "#836e58", "#232326"],
      currentTheme: ["#ffffff", "#818181", "#ff6f61", "#836e58", "#232326"],
    };
  }

  handleCreateChange = (color, index) => {
    let newSelectedPalette = this.state.selectedPalette;
    newSelectedPalette[index] = color;
    this.setState({ selectedPalette: newSelectedPalette, selected: true });
  };

  render() {
    let style = {
      "--lightShade": this.state.currentTheme[0],
      "--lightAccent": this.state.currentTheme[1],
      "--mainColor": this.state.currentTheme[2],
      "--darkAccent": this.state.currentTheme[3],
      "--darkShade": this.state.currentTheme[4],
    };

    return (
      <Provider store={store}>
        <div className="appContainer" style={style}>
          <header>
            <Link exact to="/">
              <h1>acryline</h1>
            </Link>
          </header>
          <NavBar />
          <MobileNav />
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route
              path="/create"
              render={() => (
                <Create
                  selectedPalette={this.state.selectedPalette}
                  handleCreateChange={this.handleCreateChange}
                />
              )}
            />
            <Route path="/explore" render={() => <Explore />} />
            <Redirect to="/"></Redirect>
          </Switch>
          <Footer />
        </div>
      </Provider>
    );
  }
}
*/
/**
 *
 * ---------CODE_RECYCLE---------------
 *   <NavBar handleApply={this.handleApplyClick} handleMobileMenu={this.handleMobileMenu}/>
 *  <MobileNav propList={mobileNavProp} />
 *
 */


class Footer extends Component {
  render() {
    return (
      <footer>
        <p>
          Powered by{" "}
          <a href="https://casesandberg.github.io/react-color/">React Color</a>{" "}
          |{" "}
          <a href="https://github.com/Qix-/color-convert#readme">
            Color-Convert
          </a>
        </p>
        <p>© 2019 Gunhyung Cho | Jiuzhou Zhao</p>
        <address>
          Contact: <a href="mailto:ghcho@uw.edu">ghcho@uw.edu</a> |{" "}
          <a href="mailto:jz73@uw.edu">jz73@uw.edu</a>
        </address>
      </footer>
    );
  }
}
