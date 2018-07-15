import React, { Component } from "react";
import "./App.css";
import ConfigForm from "./components/ConfigForm";

class App extends Component {
  state = {
    showModal: false,
    showPlayerControls: false
  };

  loadPlayer = formValues => {
    const player = window.bitmovin.player("my-player");
    const conf = {
      key: formValues.licenseKey,
      style: {
        ux: false
      }
    };
    if (formValues.streamType === "DASH") {
      conf.source = { dash: formValues.streamURL };
    } else if (formValues.streamType === "HLS") {
      conf.source = { hls: formValues.streamURL };
    }

    if (player.isSetup()) {
      player.load(conf.source).then(
        playerInstance => {
          console.log("Successfully loaded new video URL");
          this.setState({ showPlayerControls: true });
        },
        reason => {
          console.log("Error while loading new video URL");
          window.alert("Error while loading new video URL");
        }
      );
    } else {
      player.setup(conf).then(
        playerInstance => {
          console.log("Successfully created Bitmovin Player instance");
          this.setState({ showPlayerControls: true });
        },
        reason => {
          console.log("Error while creating Bitmovin Player instance");
          window.alert("Error while creating Bitmovin Player instance");
        }
      );
    }
  };

  play = () => {
    const player = window.bitmovin.player("my-player");
    player.play();
  };

  pause = () => {
    const player = window.bitmovin.player("my-player");
    player.pause();
  };

  seek = amount => {
    const player = window.bitmovin.player("my-player");
    player.seek(player.getCurrentTime() + amount);
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal }, () => {
      if (this.state.showModal) {
        const player = window.bitmovin.player("my-player");
        player.pause();
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });
  };

  render() {
    return (
      <div className="App">
        <ConfigForm handleSubmit={this.loadPlayer.bind(this)} />
        <button className="btn greyBtn" onClick={this.toggleModal}>
          About
        </button>
        <div id="my-player" />
        {this.state.showPlayerControls === true && (
          <React.Fragment>
            <button className="btn" onClick={this.play}>
              <i className="fas fa-play" />
            </button>
            <button className="btn" onClick={this.pause}>
              <i className="fas fa-pause" />
            </button>
            <button className="btn" onClick={this.seek.bind(this, 10)}>
              <i className="fas fa-forward" />
            </button>
          </React.Fragment>
        )}

        {this.state.showModal === true && (
          <div className="modal">
            <h2>About page</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <button className="btn" onClick={this.toggleModal}>
              Back to video
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
