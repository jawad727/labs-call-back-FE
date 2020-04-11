import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import PlacesAutocomplete from "react-places-autocomplete";
import LocationSearch from "./LocationSearchInput";
import { Spinner, Fade } from "reactstrap";
// import MapContainer from './GoogleMaps';


class Form1 extends Component {
  state = {
    StoreName: "",
    StoreAddress: "",
    StorePhone: "",
    StoreWebsite: "",
    StoreGoogleRating: "",
    isLoading: true,
    written: false
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
    this.someFn();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  someFn = () => {
    // let name = 'kabanas'
    this.props.triggerStoreUpdate(
      this.state.StoreName,
      this.state.StoreAddress,
      this.state.StorePhone,
      this.state.StoreWebsite,
      this.state.StoreGoogleRating
    );
  };

  updateGooglePlaces = (
    StoreNameFromPlaces,
    StoreAddressFromPlaces,
    StorePhoneFromPlaces,
    StoreWebsiteFromPlaces,
    StoreRatingFromPlaces
  ) => {
    this.setState({
      StoreName: StoreNameFromPlaces,
      StoreAddress: StoreAddressFromPlaces,
      StorePhone: StorePhoneFromPlaces,
      StoreWebsite: StoreWebsiteFromPlaces,
      StoreGoogleRating: StoreRatingFromPlaces
    });
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

    // console.log("written", this.state.StoreName)

    return (
      <MuiThemeProvider>
        <div class="searchbar-container">
          <Fade tag="h5" className="mt-3">
            <div className="form1-cont">
              <h1 id="searchTextMobile" class="searchTitle RTSlist ">Search For A Company Below:</h1>
              <div className="searchBarDivContainer">
              <LocationSearch
                className="locationSearcher RTSlist marginzero"
                triggerUpdatePlaces={this.updateGooglePlaces}
              />
              </div>
              

              <div className="form1image"/>

              <br />

              {  this.state.StoreName.length == 0 ? null : 

              <div className="buttonform1contaier">
              <RaisedButton
                className="search-Button RTSlist"
                label="Continue"
                primary={true}
                style={styles.button}
                onClick={this.continue}
                className="continue-btn"
              />
              </div> }
              
            </div>
          </Fade>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default Form1;
