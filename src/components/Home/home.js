import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import axios from "axios";
import * as firebase from "firebase";

import { withAuthorization } from "../Session/session.js";
import Navigation from "../Navigation/navigation.js";

import ComplaintCard from "../Feeds/ComplaintCard.js";
import ComplaintCardNoAuth from "../Feeds/ComplaintCardNoAuth.js";
import Chart from "../Chart/Chart.js";
import { Spinner, Fade } from "reactstrap";

import MaterialIcon, { colorPalette } from "material-icons-react";

import { AuthUserContext } from "../Session/session.js";

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <HomePageWithAuth /> : <HomePageNoAuth />)}
  </AuthUserContext.Consumer>
);

const hostURL = "https://hiffvl9nb9.execute-api.us-east-1.amazonaws.com/dev/posts"



class HomePageWithAuth extends Component {
  state = {
    complaintFeed: [],
    loading: true,
    cardLoader: 6,
    highLightNumber: 2
  };


  componentDidMount() {
    this.complaints();
  }

  user = firebase.auth().currentUser;


  StoreNamess = () => {
    return this.state.complaintFeed.map(item => {
      return item.StoreName;
    });
  };

  complaints = () => {
    axios
      .get(hostURL)
      .then(response => {
        this.setState({ complaintFeed: response.data, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  };

  compareVotes = ( a, b ) => { if ( a.upVote < b.upVote ){ return -1;} if ( a.upVote > b.upVote ){return 1;} return 0;}

  sortedArray = () => {return this.state.complaintFeed.map((card, i) => {return <ComplaintCard complaintsCall={this.complaints}  key={i} card={card} />;}) }

  sortByUpvotes = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      console.log(arr[i]["upVote"])

      for (let j=0; j<arr.length - 1; j++) {
        if (arr[j]["upVote"] < arr[j + 1]["upVote"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  sortByCreatedAtReverse = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr.length - 1; j++) {

        if (arr[j]["createdAt"] > arr[j + 1]["createdAt"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  sortByCreated = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr.length - 1; j++) {

        if (arr[j]["createdAt"] < arr[j + 1]["createdAt"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  render() {

    if(this.state.isLoading===true) {
      return (
      <div className="recording-loader loader">
        <br />
        <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
      </div>)
    };
    return (
      <>
      
        <Navigation />

        {this.state.loading ? <div className="recording-loader loader">
                
                <br />
                <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
        </div> 
        :
        <div className="Homepage Container">
          <div class="button-container">
            <Link class="centered" to="/complaint-form">
              <button class="complaintButton">Leave A Review</button>
            </Link>
          </div>
          <h1 class="worstReviewed">Lowest Reviewed Businesses</h1>
          <div class="HomeWrapper">
            <div>

              <div className="sortBy">

                <div onClick={() => {this.sortByUpvotes(); this.setState({highLightNumber: 1})}} className={`sorterWrapper ${this.state.highLightNumber == 1 ? "highlightedTab" : "" }`} >
                  <i class="fas fa-chart-line sortIcon"></i><p> Top </p>
                </div>

                <div onClick={() => {this.sortByCreated(); this.setState({highLightNumber: 2})}} className={`sorterWrapper ${this.state.highLightNumber == 2 ? "highlightedTab" : "" }`} >
                  <i class="fas fa-certificate sortIcon"></i><p> Newest </p>
                </div>

                <div onClick={() => {this.sortByCreatedAtReverse(); this.setState({highLightNumber: 3})}} className={`sorterWrapper ${this.state.highLightNumber == 3 ? "highlightedTab" : "" }`} >
                  <i class="fas fa-angle-double-left sortIcon"></i><p> Oldest </p>
                </div>

              </div> 

              {this.sortedArray().reverse().slice(0, this.state.cardLoader)}
              {this.state.cardLoader > this.state.complaintFeed.length ? null : <button onClick={() => {this.setState({cardLoader: this.state.cardLoader + 5})}} className="LoadMoreFeed" >Load More</button> }
            </div>

            <div class="BarGraph">
              <div class="barContainer">
                <Chart StoreArray={this.StoreNamess()} />
              </div>
            </div>
          </div>

            </div> }

              
      </>
    );
  }
}

class HomePageNoAuth extends Component {
  state = {
    complaintFeed: [],
    loading: true,
    cardLoader: 6,
    highLightNumber: 2
  };

  componentDidMount() {
    setTimeout(() => this.complaints(), 1000);
  }

  ProfilePush = () => {
    this.props.history.push(`/`);
  };

  StoreNamess = () => {
    return this.state.complaintFeed.map(item => {
      return item.StoreName;
    });
  };

  complaints = () => {
    setTimeout(() => this.setState({isLoading: false}), 1000);
    axios
      .get(hostURL)
      .then(response => {
        this.setState({ complaintFeed: response.data, loading: false });
      })
      .catch(error => {
        console.error(error);
      });
  };

  sortByUpvotes = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      console.log(arr[i]["upVote"])

      for (let j=0; j<arr.length - 1; j++) {
        if (arr[j]["upVote"] < arr[j + 1]["upVote"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  sortByCreatedAtReverse = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr.length - 1; j++) {

        if (arr[j]["createdAt"] > arr[j + 1]["createdAt"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  sortByCreated = () => {
    var arr = this.state.complaintFeed

    for (let i=0; i<arr.length; i++) {
      for (let j=0; j<arr.length - 1; j++) {

        if (arr[j]["createdAt"] < arr[j + 1]["createdAt"]) {
          var temp = arr[j]
          arr[j] = arr[j+1]
          arr[j+1] = temp
        }
      }
    }

    this.setState({complaintFeed: arr})
  }

  render() {

   

    if(this.state.isLoading===true) {
      return (
      <div className="recording-loader loader">
  
        <br />
        <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
      </div>)
    };
      return (
          <>
          <Navigation />

          {this.state.loading ? <div className="recording-loader loader">
            
                <br />
                <div className="centerSpinner">
                <Spinner style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
                </div> :

              <div className='Homepage Container'>
                <div className="button-container">
              <Link className="centered" to='/complaint-form'>
                  <button className="complaintButton">
                      
                      Leave A Review 

                  </button>
              </Link>
                </div>            
                  <h1 class="worstReviewed">
                      Lowest Reviewed Businesses
                  </h1>
                  <div class="HomeWrapper">
                    
                  <div>  
                      <div className="sortBy">

                        <div onClick={() => {this.sortByUpvotes(); this.setState({highLightNumber: 1})}} className={`sorterWrapper ${this.state.highLightNumber == 1 ? "highlightedTab" : null }`} >
                          <i class="fas fa-chart-line sortIcon"></i><p> Top </p>
                        </div>

                        <div onClick={() => {this.sortByCreated(); this.setState({highLightNumber: 2})}} className={`sorterWrapper ${this.state.highLightNumber == 2 ? "highlightedTab" : null }`} >
                          <i class="fas fa-certificate sortIcon"></i><p> Newest </p>
                        </div>

                        <div onClick={() => {this.sortByCreatedAtReverse(); this.setState({highLightNumber: 3})}} className={`sorterWrapper ${this.state.highLightNumber == 3 ? "highlightedTab" : null }`} >
                          <i class="fas fa-angle-double-left sortIcon"></i><p> Oldest </p>
                        </div>

                      </div> 

                      {this.state.complaintFeed.map((card, i) => {
                          return <ComplaintCardNoAuth key={i} card={card}/> 
                      }).slice(0, this.state.cardLoader)}
                      {this.state.cardLoader > this.state.complaintFeed.length ? null : <button onClick={() => {this.setState({cardLoader: this.state.cardLoader + 5})}} className="LoadMoreFeed" >Load More</button> }
                  </div>

                  <div class="BarGraph" >
                    <div class="barContainer">
                      <Chart StoreArray={this.StoreNamess()}/>
                    </div>
                    <Link to="/login">
                      <div className="HomeSignin">
                        <i class="fas fa-sign-in-alt"></i><p> Log In </p>
                      </div>
                    </Link>

                  </div>

                  </div>
                    </div> }
          </>
      )
  }
}

// const condition = authUser => !!authUser;

// export default withAuthorization(condition)(HomePage);
export default HomePage;
