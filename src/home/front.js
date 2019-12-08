import React, { Component } from 'react'; //import React Component
import './front.css'

export class FrontPage extends Component {

 render() {
    
    return (
        <main>
            <div id='uppercontainer'>
                <h2>Welcome to acryline</h2>
            </div>
            <div className='createtutorial tutorial'>
                <p className='frontp sectionstart'>Choose five colors and create your palette</p>
                <div className='createimg tutorialimg'></div>
                <p className='frontp'>Save your palette with your artist name</p>
            </div>
            <div className='exploretutorial tutorial'>
                <p className='frontp sectionstart'>Look for other people's work</p>
                <div className='exploreimg tutorialimg'></div>
                <p className='frontp'>Select a palette for more information</p>
            </div>
            <div className='locktutorial tutorial'>
                <p className='frontp sectionstart'>Lock specific color to refine your search</p>
                <div className='selectedimg tutorialimg'></div>
            </div>
            <div className='applytutorial tutorial'>
                <p className='frontp applyp'>Apply palette and see it in action</p>
                <div className='applyimg tutorialimg'></div>
            </div>
        </main>
    );
  }
}