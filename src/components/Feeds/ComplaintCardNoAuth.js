import React, {Component} from 'react'
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import './ComplaintCard.css';
import MaterialIcon, {colorPalette} from 'material-icons-react';

const baseURL = "http://localhost:5000/api/routes/posts/"

  export default class ComplaintCard extends Component {
    render() {
        return (
            <div>
                <Card className="card-container">

                        <div class="upvote-container">
                            <div>
                            <i class="fas fa-chevron-up cardClicker" onClick={() => {alert("Log In Before Rating Reviews")}}></i>
                        <p class="upvote">{this.props.card.upVote}</p>
                            <i class="fas fa-chevron-down cardClicker" onClick={() => {alert("Log In Before Rating Reviews")}}></i>
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