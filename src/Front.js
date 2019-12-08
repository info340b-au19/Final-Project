import React, { Component } from 'react'; //import React Component
import { Carousel, Button, UncontrolledCarousel } from 'reactstrap';
//import UncontrolledCarousel from '@bit/reactstrap.reactstrap.uncontrolled-carousel';
import _ from 'lodash';
import './index.css'
//import FrontPage from './Front';

export default class FrontPage extends Component {
//Now try to click \'Apply\' button to check your work
 render() {
    //let carouselItems = { src: 'img/create_2.svg', altText: 'create', caption: '' }
    let carouselItems = [{src:'img/create_3.jpg', altText:'Create', caption:'with palettes we give you', header:'Create your colors'}, {src:'img/com_3.jpg', altText:'com', caption:'and explore their works', header:'Share your taste'}, {src:'img/apply_3.jpg', altText:'Apply', caption:'Now try to click \'Apply\' button', header:'Test your job'}]
    return (
        <div>
            <body>
            <section id="uppercontainer_front">
                <h2 className="front_h2">Build Your Own Colors</h2>
                <h3 className="front_h3"> with our powerful tool</h3>
            </section>
            <div id="tutorial_container">
                <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'
                />
                <div id="control_slides">
                <UncontrolledCarousel
                items={carouselItems} 
                indicators={false}
                controls={true}
                autoPlay={false}
                />
                </div>
            </div>
            {/*

               <section id="uppercontainer_front">
                    <h2 className="front_h2">Build Your Own Colors</h2>
                </section>
                <section id="tutorial_container">
                    <div className="holder">
                        <img className="pic_holder_1" src="img/create_2.svg" alt=" "/>
                        <h3 className="desc">Use your imagination to create your own color set</h3>
                    </div>
                    <div className="holder">
                        <img className="pic_holder_2" src="img/com.jpg" alt=" "/>
                        <h3 className="desc_right">Explore works of other artists</h3>
                    </div>
                    <div className="holder">
                        <img className="pic_holder_3" src="img/apply_2.svg" alt=" "/>
                        <h3 className="desc">Apply your design to real life job</h3>
                    </div>
            </section>*/}

            </body>
        </div>
    );
  }
}