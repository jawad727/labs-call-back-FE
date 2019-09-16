import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { Spinner, Fade } from "reactstrap";

import "./FormContainer.css";

class Form3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcription: this.props.transcription,
      isLoading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  addTranscript = e => {
    // e.preventDefault();
    this.props.setTranscriptionProps(this.state.transcription);
    // this.props.nextStep();
  };

  handleChange = e => {
    this.setState({ transcription: e.target.value });
  };

  componentWillUnmount() {
    this.addTranscript();
  }

  render() {
    const { values, handleChange } = this.props;
    if (this.state.isLoading === true) {
      return (
        <div className="recording-loader loader">
          <br />
          <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
        </div>
      );
    }
    return (
      <MuiThemeProvider>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <div className="form1-cont">
            <div className="form-container">
              <h1 className="FormFonts">Transcription</h1>
              <form
                onSubmit={this.addTranscript}
                className="text-input-container"
              >
                <textarea
                  className="form-input"
                  type="text"
                  value={this.state.transcription}
                  onChange={this.handleChange}
                />
              </form>

              <br />
              <div className='form3-buttons'>
              <RaisedButton
                label="Back"
                primary={false}
                style={styles.button}
                onClick={this.back}
              />

              <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
                onClick={this.continue}
              />
              </div>
            </div>
          </div>
        </Fade>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default Form3;
