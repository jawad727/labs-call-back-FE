import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './ComplaintCard.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import axios from 'axios';

const baseURL = "https://hiffvl9nb9.execute-api.us-east-1.amazonaws.com/dev/post/"

  export default class ComplaintCard extends Component {
      state = {
          upvote: this.props.card.upVote + 1,
          downvote: this.props.card.upVote - 1,
      }
      

    upvote = (e) => {

        axios.put(`${baseURL}${this.props.card.id}`, {
            paramName: "upVote",
	        paramValue: this.state.upvote
        })
        .then(res => this.props.complaintsCall())
        .catch(err => this.props.complaintsCall())

        
    }

    downvote = (e) => {
        
        axios.put(`${baseURL}${this.props.card.id}`, {
            paramName: "upVote",
	        paramValue: this.state.downvote
        })
        .then(res => this.props.complaintsCall())
        .catch(err => this.props.complaintsCall())
    }

    


    render() {
        console.log(this.props.card)
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
                        
                    <div className="cardTextFont">
                        <div class="titleAddy">
                        <CardText className="cardTitle">{` ${this.props.card.StoreName}`}</CardText>

                        <CardText className="cardAddress">{`${this.props.card.StoreLocation}`}</CardText>
                        </div>

                        <CardText className="complaintText"><strong className="StrongTextCard">{`${this.props.card.DisplayName}:`}</strong>{` ${this.props.card.text}`}</CardText>
                        

                        </div>

                    </CardBody>
                </Card>
            </div>
        );
    }
}
