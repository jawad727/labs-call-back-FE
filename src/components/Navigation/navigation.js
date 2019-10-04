import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./navigation.css";

import SignOutButton from "../SignOut/signout.js";
import * as ROUTES from "../constants/routes.js";
import { AuthUserContext } from "../Session/session.js";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

class NavigationAuth extends Component {
  toggle = this.toggle.bind(this);
  state = {
    isOpen: false
  };
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  user = firebase.auth().currentUser;

  render() {
    return (
      <div>
        <Navbar light expand="md">
          <NavbarBrand href="/home">
            {" "}
            <div className="logo-nav">
              <img src={require("../Landing/imgs/brandmark-designcoor.png")} />
            </div>
          </NavbarBrand>
          {/* <NavbarToggler onClick={this.toggle} /> */}

          {/* <Collapse isOpen={this.state.isOpen} navbar> */}
            <Nav className="ml-auto fontchange2" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle className="fontchange3" nav caret>
                  <img className="profileThumbnailNav" src={this.user.photoURL} /> 
                  Profile
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/profile">
                    <DropdownItem className="fontchange2">View Complaint History</DropdownItem>
                  </Link>
                  <Link to="/edit-profile">
                    <DropdownItem className="fontchange2">Edit Profile</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem>
                    <SignOutButton className="fontchange2"/>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          {/* </Collapse> */}
        </Navbar>
      </div>
    );
  }
}

const NavigationNonAuth = () => {
  return (
    <div>
      <Navbar color="light" light expand="md" className="navbar">
        <NavbarBrand href="/">
          <div className="logo-nav">
            <img src={require("../Landing/imgs/brandmark-designcoor.png")} />
          </div>
        </NavbarBrand>
        {/* <NavbarToggler /> */}
        <Collapse navbar>
          <Nav className="ml-auto" navbar />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
