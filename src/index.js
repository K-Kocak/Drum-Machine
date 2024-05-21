import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

const keysArray = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

class App extends React.Component {
constructor(props){
super(props);

this.state = {
display: ""
}

this.buttonID = this.buttonID.bind(this);
}

// key to send up leads to button id, we set its state to the id we passed up (replacing the - with a space)
buttonID(id) {
this.setState({
display: id.replace("-", " ")
})
}

render() {
return (
<div class="inner-container" id="drum-machine">
  <h1>Drum Machine</h1>
  <Pads keyToSendUp={this.buttonID}/>
  <Controls idToDisplay={this.state.display}/>
</div>
)
}
}

class Pads extends React.Component {
constructor(props){
super(props);

this.handleKeyPress = this.handleKeyPress.bind(this);
this.getElement = this.getElement.bind(this);
this.playAudio = this.playAudio.bind(this);
}


componentDidMount() {
document.addEventListener("keydown", this.handleKeyPress);
}

// when a key is pressed, we go through the keyPressed array to find what letter was pressed so that we can find the associated id. if the key isnt in the array we just return
handleKeyPress(event) {
const keyPressed = keysArray.filter((key) => event.key.toUpperCase() === key.keyTrigger);
if(keyPressed.length === 0) {
return;
}
// set the two elements appropriately then call playAudio
const divElement = document.getElementById(keyPressed[0].id);
const audioElement = document.getElementById(keyPressed[0].keyTrigger);
this.playAudio(audioElement, divElement);
}

// this is for when the buttons are clicked, sets the two elements appropraitely then calls play audio
getElement(event) {
const divElement = document.getElementById(event.target.id);
const audioElement = document.getElementById(event.target.children[0].id);	
this.playAudio(audioElement, divElement);
}

// plays the audio, then  sends up to app the id of the button
playAudio(audio, div){
audio.currentTime = 0;
audio.play();
this.props.keyToSendUp(div.id);
}

render() {
  return (
  <div class="pad-bank">
    <div class="drum-pad" id="Heater-1" onClick={this.getElement}><audio class="clip" id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>Q</div>
    <div class="drum-pad" id="Heater-2" onClick={this.getElement}><audio class="clip" id="W" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"></audio>W</div>
    <div class="drum-pad" id="Heater-3" onClick={this.getElement}><audio class="clip" id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"></audio>E</div>
    <div class="drum-pad" id="Heater-4" onClick={this.getElement}><audio class="clip" id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"></audio>A</div>
    <div class="drum-pad" id="Clap" onClick={this.getElement}><audio class="clip" id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"></audio>S</div>
    <div class="drum-pad" id="Open-HH" onClick={this.getElement}><audio class="clip" id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"></audio>D</div>
    <div class="drum-pad" id="Kick-n'-Hat" onClick={this.getElement}><audio class="clip" id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"></audio>Z</div>
    <div class="drum-pad" id="Kick" onClick={this.getElement}><audio class="clip" id="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>X</div>
    <div class="drum-pad" id="Closed-HH" onClick={this.getElement}><audio class="clip" id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"></audio>C</div>
  </div>
  )
  }
}

class Controls extends React.Component {
  render() {
    return (
    <div class="controls-container">
      <p id="display">{this.props.idToDisplay}</p>
    </div>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
