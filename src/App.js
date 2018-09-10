import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
// COMPONENTS
import Navigation from './components/Navigaton/navigation';
import Logo from './components/Logo/logo';
import Rank from './components/Rank/rank';
import Signin from './components/Signin/signin';
import Register from './components/Register/register';
import FaceRecognition from './components/FaceRecognition/faceRecognition';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';

import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: '1fd483ce94b64fd2a3cf4fb876315671'
 });
 


const particlesOptions = 
  {
    particles: {
      "number": {
        "value": 180,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
    //   "move": {
    //     "enable": true,
    //     "speed": 32,
    //     "direction": "none",
    //     "random": false,
    //     "straight": false,
    //     "out_mode": "out",
    //     "bounce": true,
    //     "attract": {
    //       "enable": false,
    //       "rotateX": 600,
    //       "rotateY": 1200
    //     }
      
    // },
    // "interactivity": {
    //   "detect_on": "canvas",
    //   "events": {
    //     "onhover": {
    //       "enable": false,
    //       "mode": "repulse"
    //     },
    //   }
    // },
      
    //   line_linked: {
    //     shadow: {
    //       enable: true,
    //       color: "#3CA9D1",
    //       blur: 5
    //     }
    //   }
    }
      
  }
class App extends Component {
  constructor() {
    super()
    this.state = {
        input: '',
        imageUrl: '',
        box: {

        },
        route: 'signin',
        isSignedIn: false
    }
}
calculateFaceLocation = (data) => {
 const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;

 const image = document.getElementById("inputImage");
 const width = image.width;
 const height = image.height;
 console.log("w ",width," h ",height)

 return {
    leftCol: clarifaiFace.left_col *width,
    topRow: clarifaiFace.top_row *height,
    rightCol: width - (clarifaiFace.right_col*width),
    bottomRow: height - (clarifaiFace.bottom_row*height)
 }
}

displayFaceBox = (box) => {
  console.log(box)
  this.setState({
    box:box
  })
}
onInputChange = (event)=> {
  this.setState({
    input: event.target.value
  })
}

onButtonSubmit= ()=> {
  this.setState({
    imageUrl: this.state.input
  })
 
  app.models.predict(
    Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response => 
      // console.log(response.outputs[0]))
       this.displayFaceBox(this.calculateFaceLocation(response)))
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box))
    
   .catch(err=> console.log(err)) 
}

onRouteChange =(route) => {
  if(route==='signout') {
    this.setState({
      isSignedIn: false
    })
  }else if (route==="home") {
    this.setState({isSignedIn:true})
  }

  this.setState( {
    route: route
  })
}
  render() {
    const {isSignedIn,imageUrl,route,box} = this.state;

    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn}onRouteCHange={this.onRouteChange}/>
        { route==='home'

        ?  
        <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl = {imageUrl}
              box={box}  /> 
          </div>
        : (route ==="signin"
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
         )
        }
       
      </div>
    );
  }
}

export default App;
