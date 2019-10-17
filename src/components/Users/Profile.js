import "./Profile.css";
import React, { Component } from "react";
import firebase from 'firebase'
import Navigation from "../Navigation/navigation";
import {Link} from 'react-router-dom';
import axios from 'axios'
import { withAuthorization } from '../Session/session.js';
import ComplaintCard from '../Feeds/ComplaintCard.js';
import { Spinner, Fade } from 'reactstrap';

const hostURL = "https://griipe-backend.herokuapp.com/api/routes/posts"

class Profile extends Component {

    user = firebase.auth().currentUser

    state = {
      complaintById: [],
      loading: true

    }

    
    componentDidMount() {
    
      this.complaints();
  
    }

  ProfilePush = () => {
    this.props.history.push(`/edit-profile`)
  }

    
  complaints = () => {
    axios
    .get(`${hostURL}/${this.user.uid}`)
    .then(response => {
      this.setState(() => ({ complaintById: response.data, loading: false }));
    })
    .catch(error => {
      console.error(error);
    });
  }



    render() {
      // console.log(this.user.uid)
    return (
      
        
      <div>
      <Navigation />

      {this.state.loading ? <div className="recording-loader loader">
                <br />
                <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
                </div> : 
      <div>
      <h2 className="ProileH2font">Your Complaint History</h2>

      <div className="ProfileWrap">
        
      <div className="profileCard">
        <div className="imgdiv">
        <img className="CardImg" src={`${this.user.photoURL}`}/>
      </div>

        <p className="ProfileFontss" >{this.user.displayName}</p>
          <p className="ProfileFontss">Total Upvotes: 0</p>
          <button className="EditBtn FormFonts" onClick={this.ProfilePush}>Edit Profile</button>
        </div>

      {this.state.complaintById[0] ? null : <h4 className="noReview">You have no reviews yet..</h4>}

      <div className="ProfileCardList">
      {this.state.complaintById.map((card, i) => {
      //   return <ComplaintCard card={card} key={this.state.id}/> 
       return <ComplaintCard card={card}/> 
        })}

        </div>
        </div>

      </div> }

      </div>

    )}
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(Profile);