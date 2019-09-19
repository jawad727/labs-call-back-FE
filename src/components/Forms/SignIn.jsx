import React, { Component } from 'react';
import { withRouter } from 'react-router';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from "firebase";
import "../Landing/LandingPage.css";
import axios from 'axios';
import Navigation from '../Navigation/navigation.js';

var postURL = "http://localhost:5000/api/routes"

class SignInConfirmation extends Component {
      state = {
        docid: null
      };
      
        docid = this.state.docid
     
        uiConfig = {
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
            callbacks: {
              signInSuccess: function (currentUser, credential, redirectUrl) {
                  return false;
              },
            }
          }

          async componentDidUpdate() {
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
              upVote: 0,
              }
              let time = new Date();
              let tweetdata = {
                status: `${this.props.StoreName}, your customer just complained about you on griipe.me  We added you to our #worstcustomerservice leaderboard at ${time}`
              }
              try {
                let { data: post } = await axios.post(`https://griipe.herokuapp.com/api/routes/makeatweet`, tweetdata);
              } catch {
                this.props.history.push('/tweet-confirmation')
              }
              
              axios
              .post(`${postURL}/makepost`, data)
              .then(res => {
                console.log("It worked 1:", res);
              })
              .catch(err => console.log("It broke 2:", err))
              this.props.history.push('/tweet-confirmation', tweetdata)
          }

        render() {
            return (
              <>
                <Navigation />
                <div class="signin">
                  
                <div class="innerSignin">
                    <h2>Sign In</h2>
                    <StyledFirebaseAuth 
                    uiConfig={this.uiConfig} 
                    firebaseAuth={firebase.auth()} />
                </div>
                    
                </div>
              </>  
            );
          }
        }

export default withRouter(SignInConfirmation);