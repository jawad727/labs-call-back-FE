import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './ComplaintCard.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import axios from 'axios';

  export default class ComplaintCard extends Component {
      state = {
          upvote: this.props.card.upVote + 1,
          downvote: this.props.card.upVote - 1,
      }
      

    upvote = (e) => {

        axios.put(`https://griipe.herokuapp.com/api/routes/posts/${this.props.card.id}`, {
            DisplayName: this.props.card.DisplayName ,
            Email: this.props.card.Email ,
            UID: this.props.card.UID ,
            StoreName: this.props.card.StoreName ,
            StoreLocation: this.props.card.StoreLocation ,
            tweet: this.props.card.tweet,
            upVote: this.state.upvote
        })
        .then(res => this.props.complaintsCall())
        .catch(err => this.props.complaintsCall())

        
    }

    downvote = (e) => {
        
        axios.put(`https://griipe.herokuapp.com/api/routes/posts/${this.props.card.id}`, {
            DisplayName: this.props.card.DisplayName ,
            Email: this.props.card.Email ,
            UID: this.props.card.UID ,
            StoreName: this.props.card.StoreName ,
            StoreLocation: this.props.card.StoreLocation ,
            tweet: this.props.card.tweet,
            upVote: this.state.downvote
        })
        .then(res => this.props.complaintsCall())
        .catch(err => this.props.complaintsCall())
    }

    


    render() {
        return (
            <div>
                <Card className="card-container">

                        <div class="upvote-container">
                            <div>
                            <i class="fas fa-chevron-up cardClicker" onClick={this.upvote}></i>
                        <p class="upvote">{this.props.card.upVote}</p>
                            <i class="fas fa-chevron-down cardClicker" onClick={this.downvote}></i>
                            </div>
                        </div>

                    <CardBody>
                        
                    <div>
                        <div class="titleAddy">
                        <CardText className="cardTitle">{` ${this.props.card.StoreName}`}</CardText>

                        <CardText className="cardAddress">{`${this.props.card.StoreLocation}`}</CardText>
                        </div>

                        <CardText className="complaintText"><strong>{`${this.props.card.DisplayName}:`}</strong>{` ${this.props.card.text}`}</CardText>
                        

                        </div>

                    </CardBody>
                </Card>
            </div>
        );
    }
}
