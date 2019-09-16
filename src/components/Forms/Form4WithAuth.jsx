import React, { Component } from "react";
import { withRouter } from "react-router";
import * as firebase from "firebase";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import { Spinner, Fade, NavLink } from "reactstrap";
import CloudDoneIcon from "@material-ui/icons/CloudDone";

var siteURL = "http://localhost:5000/api/routes"

class Form4WithAuth extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  tweetAndRoute = async () => {
    let data = {
      DisplayName: firebase.auth().currentUser.displayName,
      Email: firebase.auth().currentUser.email,
      UID: firebase.auth().currentUser.uid,
      StoreName: this.props.StoreName,
      StoreLocation: this.props.StoreAddress,
      StorePhoneNumber: this.props.StorePhone,
      StoreGoogleRating: this.props.StoreGoogleRating,
      StoreWebsite: this.props.StoreWebsite,
      text: this.props.confirmationTranscription,
      upVote: 0
    };
    let time = new Date();
    let tweetdata = {
      status: `${
        this.props.StoreName
      }, your customer just complained about you on griipe.me  We added you to our #worstcustomerservice leaderboard at ${time}`
    };
    try {
      let { data: post } = await axios.post(
        `https://griipe.herokuapp.com/api/routes/makeatweet`,
        tweetdata
      );
    } catch {
      this.props.history.push("/tweet-confirmation");
    }

    axios
      .post(`${siteURL}/makepost`, data)
      .then(res => {
        console.log("It worked 1:", res);
      })
      .catch(err => console.log("It broke 2:", err));
    this.props.history.push("/tweet-confirmation", tweetdata);
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
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3 form-container2">
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
            <div className="confirmation-container">
              <span className="confirmation-span">
                <CloudDoneIcon color="error" />
                <p className="confirmation-input">
                  <strong>Signed-In:</strong> Yes
                </p>
              </span>
            </div>
          </div>
          <NavLink to="/home" onClick={this.tweetAndRoute}>
            <RaisedButton
              label="Send Tweet"
              primary={true}
              style={styles.button}
              // onClick={this.tweetAndRoute}
            />
          </NavLink>
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

export default withRouter(Form4WithAuth);
