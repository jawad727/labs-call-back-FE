import React, { Component } from "react";
import "./App.css";
import * as firebase from "firebase";
import fire from "./fire";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Signedin from './SignedIn'

class App extends Component {

  state = {
    speed: 0,
    age: '',
    allData: []
  };


  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false,
      signInSuccessWithAuthResult: (authResult, redirectURL) => {
        console.log(authResult);
        console.log(fire.firestore());

        fire.firestore().collection('users').doc(authResult.user.uid)
        .get().then(user => {if (user.exists) {console.log(`user logging in: ${user}`)} else {
          console.log(user)
          fire.firestore().collection('users').doc(authResult.user.uid).set({
            name: authResult.user.displayName,
            email: authResult.user.email
          })
        }})
        .catch(err => {console.log(err)})
      }
    }
  }


  componentDidMount() {

     

    firebase.auth().onAuthStateChanged(user => {
      
      this.setState({isSignedIn: !!user})
      console.log("user", user)

    })
  }


  // updateInput = e => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   });
  // };

  // addData = e => {
  //   e.preventDefault();
  //   const db = fire.firestore();
  //   db.settings({
  //     timestampsInSnapshots: true
  //   });
  //   db.collection("member").add({
  //     name: this.state.name,
  //     age: this.state.age
  //   });
  //   this.setState({
  //     name: "",
  //     age: ""
  //   });
  // };

  // getData = () => {
  //   const db = fire.firestore();
  //   db.settings({
  //     timestampsInSnapshots: true
  //   });
  //   let wholeData = [];
  //   db.collection("member")
  //     .orderBy("name", "asc")
  //     .get()
  //     .then(snapshot => {
  //       snapshot.forEach(doc => {
  //         console.log(doc.data());
  //         wholeData.push(doc.data());
  //       });
  //       console.log(wholeData);
  //       this.setState({ allData: wholeData });
  //       console.log(this.state.allData);
  //     })
  //     .catch(error => {
  //       console.log("Error!", error);
  //     });
  // };


  render() {
    
    // let listOfData = this.state.allData.map((val, i)=>{
    //   let name = val.name
    //   let age = val.age
    //   return (
    //     <li key={i}>{name} ({age})</li>
    //   ) 
    // })

    return (
      <div style={{margin:'30px'}}>

        {/* <form onSubmit={this.addData}>
          <input
            type="text"
            name="name"
            placeholder="Input your name..."
            onChange={this.updateInput}
            value={this.state.name}
          />
          <br/>
          <input
            type="number"
            name="age"
            placeholder="Input your age..."
            onChange={this.updateInput}
            value={this.state.age}
          />
          <br/>
          <button type="submit">Submit</button>
        </form>

        <button onClick={this.getData}>
          Get Data
        </button>

        <ul>{listOfData}</ul> */}

        {this.state.isSignedIn ? <Signedin /> : 
          <StyledFirebaseAuth 
            uiConfig={this.uiConfig} 
            firebaseAuth={fire.auth()} />}
    

      </div>
      );
    }
   }

export default App;