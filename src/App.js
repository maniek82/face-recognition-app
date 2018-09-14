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

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
  class App extends Component {
    constructor() {
      super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
        }
      }
    }
  
    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
    }
  
    calculateFaceLocation = (data) => {
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    }
  
    displayFaceBox = (box) => {
      this.setState({box: box});
    }
  
    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }
  
    onButtonSubmit = () => {
      this.setState({imageUrl: this.state.input});

      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response=>response.json())
        .then(response => {
          
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState({user: Object.assign(this.state.user, {entries: count})})
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }
  
    onRouteChange = (route) => {
      if (route === 'signout') {
        this.setState(initialState)
      } else if (route === 'home') {
        this.setState({isSignedIn: true})
      }
      this.setState({route: route});
    }
  
    render() {
      const { isSignedIn, imageUrl, route, box } = this.state;
      return (
        <div className="App">
           <Particles className='particles'
            params={particlesOptions}
          />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
          { route === 'home'
            ? <div>
                <Logo />
                <Rank
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLinkForm
                  onInputChange={this.onInputChange}
                  onButtonSubmit={this.onButtonSubmit}
                />
                <FaceRecognition box={box} imageUrl={imageUrl} />
              </div>
            : (
               route === 'signin'
               ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
               : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
      );
    }
  }
  
  export default App;