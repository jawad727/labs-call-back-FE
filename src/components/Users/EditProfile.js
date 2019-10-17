import "./EditProfile.css";
import React, { Component } from "react";
import firebase from "firebase";
import Navigation from "../Navigation/navigation";

import { withAuthorization } from "../Session/session.js";
import {TweenMax} from "gsap"

class EditProfile extends Component {

  user = firebase.auth().currentUser;

  state = {
    displayName: this.user.displayName,
    photoURL: this.user.photoURL,
    email: this.user.email,
    showInput: false,
    popup: false
  };

  updateProf = e => {
    this.user
      .updateProfile({
        displayName: this.state.displayName,
        photoURL: this.state.photoURL,

      }).then(function() {
        console.log('Profile Successfully Updated')
      }).catch(function(error) {
        console.log(error)
      }) 
    }

    inputToggle = (e) => {
        e.preventDefault()
        this.setState({ showInput: !this.state.showInput })
    }

    changeHandler = e => {
        this.setState({
          [e.target.name] : e.target.value,
        })
      }

    editMenuAnimationOpen = () => { 
        TweenMax.to(".hidden", 1, { height: "280px"})
    }

    editMenuAnimationClose = () => {
      TweenMax.to(".hidden", 1, { height: "0px"})
    }
      


    render() {
      console.log(this.user)
      
    return (
      <>
        <Navigation />

        <div class="containerCenter">

        {this.state.showInput ? this.editMenuAnimationOpen() : this.editMenuAnimationClose()}

          {this.state.popup ? 
          <div class="popup">
            <h4 onClick={(e) => this.setState({popup: false})} >x</h4>
              <p>Are you sure you want to delete your account?</p>
              <button onClick={(e) => this.setState({popup: false})} >No</button>
              <button onClick={() =>
                  this.user.delete()
                    .then(function() {
                      console.log("user deleted");
                    })
                    .catch(function(error) {
                      console.log(error);
                    })}>Yes</button>
            </div> : null}


          <div class="profileContainer">
            <h3 >Edit Profile</h3>

            <p>{this.state.showInput}</p>

            <div class="profile-div">
              <img class="profilePic" src={ this.user.photoURL == null ||this.user.photoURL.length < 15 ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' : this.user.photoURL} />

              <div class="textContainer">
                
                <p class="profileText">{`Name: ${this.user.displayName}`}</p>
                <p class="profileText">{`Email: ${this.user.email}`}</p>
                <p class="profileText">{`Phone Number: ${
                  this.user.phoneNumber ? this.user.phoneNumber : "n/a"
                }`}</p>

                <button onClick={() => {this.setState({ showInput: !this.state.showInput })}}> Edit Profile </button>
              </div>
            </div>


            {/* {this.state.showInput ? ( */}
              <div class="hidden">
                <form onSubmit={this.updateProf}>
                  <p class="text-centers">Display Name:</p>{" "}
                  <input
                    placeholder="Display Name..."
                    value={this.state.displayName}
                    onChange={this.changeHandler}
                    name="displayName"
                  />
                  <p class="text-centers">URL:</p>
                  
                  <input
                    placeholder={"Photo URL..."}
                    value={this.state.photoURL}
                    onChange={this.changeHandler}
                    name="photoURL"
                  />

                  <button class="text-centers UpdateBtnMargin"> Update Profile </button>
                </form>
              </div>
            {/* ) : null} */}

            <div class="deleteContainer">
              <h3 class="red">Danger Zone</h3>
              <p>WARNING</p>
              <p>Once you delete your account you can not go back</p>
              <button
                onClick={(e) => this.setState({popup: true})}>
                {" "}
                Delete Account{" "}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(EditProfile);
