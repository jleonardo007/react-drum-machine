import React from "react";
import drumPads from './drumPads';


const activePadStyle = {
  background: "linear-gradient(to right, #2193b0, #6dd5ed)",
  boxShadow: "none",
  fontSize: "2rem"
};

class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: {}
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  updateDisplay = () => {
    let padId = this.props.drumPad.id;
    this.props.showId(padId);
  };

  activePad = () => {
    this.setState({
      padStyle: activePadStyle
    });
    setTimeout(() => {
      this.setState({
        padStyle: {}
      });
    }, 200);
  };

  playSound = () => {
    const padSound = document.getElementById(this.props.drumPad.keyTrigger);
    padSound.currentTime = 0;
    padSound.volume = this.props.volume;
    padSound.play();
    this.updateDisplay();
    this.activePad();
  };

  handleKeyPress = e => {
    if (e.keyCode === this.props.drumPad.keyCode) this.playSound();
  };

  render() {
    const pad = this.props.drumPad;
    return (
      <div
        className="drum-pad"
        id={pad.id}
        onClick={this.playSound}
        style={this.state.padStyle}
      >
        <span>{pad.keyTrigger}</span>
        <audio className="clip" id={pad.keyTrigger} src={pad.url} />
      </div>
    );
  }
}

class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInput: "",
      currentVolume: 0.5
    };
  }

  showPadId = id => {
    this.setState({
      displayInput: id
    });
  };

  updateVolume = e => {
    this.setState({
      displayInput:
        e.target.value === "0"
          ? `Mute`
          : `Volume: ${Math.floor(e.target.value * 100)}`,
      currentVolume: e.target.value
    });
  };

  render() {
    return (
      <div id="drum-machine">
        <div id="title">
          <img src="https://goo.gl/Umyytc" alt= "React-logo" />
          <h1>React Drum Machine</h1>
        </div>
        <div className="drum-pads">
          {drumPads.map(drumPad => {
            return (
              <Pad
                drumPad={drumPad}
                showId={this.showPadId}
                volume={this.state.currentVolume}
              />
            );
          })}
        </div>
        <div className="drum-control">
          <div id="display">
            <strong>{this.state.displayInput}</strong>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={this.updateVolume}
          />
        </div>
      </div>
    );
  }
}

export default DrumMachine;
