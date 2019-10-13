import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import axios from "axios";
import { withAuthentication } from "../Session/session.js";
import { Spinner } from "reactstrap";

import "./LandingPage.css";

class LandingPage extends Component {
  state = {
    docid: null,
    loading: false
  };

  docid = this.state.docid; 

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: "/home"
  };

  componentDidMount() {
    setTimeout(() => this.setState({loading: false}), 0);
    axios
    .get(`https://griipe.herokuapp.com/`)
    .then(res => {
      return res;
    })
    .catch(err => console.log(err));
  }

  componentWillUnmount() {
    window.location.reload();
  }
  
  render() {
    if(this.state.isLoading===true) {
      return (
      <div className="recording-loader loader">
        <h1>Griipe</h1>
        <br />
        
        <Spinner style={{ width: '3rem', height: '3rem' }} />
        
      </div>)
    };
    return (
      <div className="main-cont">

        {this.state.loading ? 
        <div className="recording-loader loader">

                <br />
                <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
        </div> :

        <div className="topcontainer">
          

          <div className="logo-two">
            <img id="griipeLogoWide" className='GriipeLogo' src={require("./imgs/brandmark-designcoor.png")} />
          </div>

          <div className="doubleButton">

          <img id="griipeLogoMobile" className='GriipeLogo' src={require("./imgs/brandmark-designcoor.png")} />

            <div className="doubleButtonInner">
            <button className="doubleButtonSingle2 RTSlist" onClick={e => {this.props.history.push("/home")}}>Complaints</button>
            <button className="doubleButtonSingle RTSlist" onClick={e => {this.props.history.push("/login")}}>Login</button>
            </div>
          </div>

          <div className="topcontainer-wrapper">


            <div className="startBox-container">
              <div className="startBox">


                <div className="doubleButtonMobile">

          <img id="griipeLogoMobile" className='GriipeLogo' src={require("./imgs/brandmark-designcoor.png")} />

            <div className="doubleButtonInner">
            <button className="doubleButtonSingle2 RTSlist" onClick={e => {this.props.history.push("/home")}}>Complaints</button>
            <button className="doubleButtonSingle RTSlist" onClick={e => {this.props.history.push("/login")}}>Login</button>
            </div>
          </div>



                {" "}
                <h1 class="landingSlogan"> A Bad Experience Should Never Go Unchecked </h1>
                <br />
               
                <ul>
                  <li class="RTSlist" >- Record</li>

                  <li class="RTSlist" >- Transcribe</li>

                  <li class="RTSlist" >- Send A Review</li>
                </ul>
                <br/>
                <Link className="LandingWideButton" to="/complaint-form">
                  <button class="start-btn RTSlist">Get Started</button>
                </Link>
                <Link className="LandingMobileButton" to="/home">
                  <button class="start-btn RTSlist">Get Started</button>
                </Link>
              </div>
            </div>

            <div className="startBox-container2">
              <div className="startBox-two">
                <div className="start-content">
                  <img src={require("./imgs/mushroom.png")} />

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div> }
      </div>
    );
  }
}

export default LandingPage