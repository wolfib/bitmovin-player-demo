import React, { Component } from "react";

class ConfigForm extends Component {
  state = {
    licenseKey: "0175190e-744d-416c-84e2-ce1ff84c857d",
    streamURL:
      "//bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    streamType: "DASH"
  };

  handleChange = event => {
    const newState =
      event.target.type === "radio"
        ? { name: "streamType", value: event.target.name }
        : { name: event.target.name, value: event.target.value };
    this.setState({ [newState.name]: newState.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="formRow">
            <label>
              License Key
              <input
                type="text"
                value={this.state.licenseKey}
                onChange={this.handleChange}
                name="licenseKey"
                size="100"
              />
            </label>
          </div>
          <div className="formRow">
            <label>
              Stream URL
              <input
                type="text"
                value={this.state.streamURL}
                onChange={this.handleChange}
                name="streamURL"
                size="100"
              />
            </label>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="DASH"
              onChange={this.handleChange}
              checked={this.state.streamType === "DASH"}
            />

            <label htmlFor="DASH">DASH</label>
            <br />
            <input
              type="radio"
              name="HLS"
              onChange={this.handleChange}
              checked={this.state.streamType === "HLS"}
            />
            <label htmlFor="HLS">HLS</label>
          </div>
          <br />
          <button className="btn">Load Video</button>
        </form>
      </div>
    );
  }
}

export default ConfigForm;
