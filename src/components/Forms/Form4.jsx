import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import MaterialIcon, { colorPalette } from "material-icons-react";
import * as firebase from "firebase";
import axios from "axios";
import { Spinner, Fade } from "reactstrap";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import { AuthUserContext } from "../Session/session.js";
import Form4WithAuth from "./Form4WithAuth";

const Form4 = props => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <Form4WithAuth {...props} /> : <Form4WithoutAuth {...props} />
    }
  </AuthUserContext.Consumer>
);

class Form4WithoutAuth extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

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
        <Fade tag="h5" className="mt-3 form-container2">
          <h1 className="form-container-header fontchange1">Confirmation</h1>
          <div className="conf-align">
            <div className="confirmation-container">
              <span className="confirmation-span">
                <CloudDoneIcon color="error" />
                <p className="confirmation-input">
                  <strong>Business:</strong> {this.props.StoreName}
                </p>
              </span>
            </div>
            <div className="confirmation-container">
              <span className="confirmation-span">
                <CloudDoneIcon color="error" />
                <p className="confirmation-input">
                  <strong>Address:</strong> {this.props.StoreAddress}
                </p>
              </span>
            </div>
            <div className="confirmation-container">
              <span className="confirmation-span">
                <CloudDoneIcon color="error" />
                <p className="confirmation-input">
                  <strong>Transcription:</strong>{" "}
                  {this.props.confirmationTranscription}
                </p>
              </span>
            </div>
          </div>
          <div className="confirmation-button">
            <RaisedButton
              label="Send Tweet"
              primary={true}
              style={styles.button}
              onClick={this.continue}
            />
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

export default Form4;