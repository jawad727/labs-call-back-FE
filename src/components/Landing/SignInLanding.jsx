import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import * as firebase from "firebase";
import "../Landing/LandingPage.css";
import axios from 'axios';
import Navigation from '../Navigation/navigation.js';


class SignInConfirmation extends Component {
    state = {
        docid: null
      };
    
        docid = this.state.docid //may have to move back to app

        
        uiConfig = {
          
          signInFlow: "popup",
          signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
            signInSuccessUrl: '/home'
          }


        render() {
            return (
              <>
                <Navigation />
                
                <div class="signin">
                
                  <div class="innerSignin">
                    <h2>sign in</h2>
                    <StyledFirebaseAuth 
                    uiConfig={this.uiConfig} 
                    firebaseAuth={firebase.auth()} />
                    </div>
                    <p className="signinMobileText"> Check us out on desktop or laptop for full experience</p>
                </div>
              </>  
            );
          }
        }

export default SignInConfirmation;