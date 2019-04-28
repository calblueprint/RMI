import React from "react";
import { Link } from "react-router-dom";
import { destroy } from '../../fetch/requester';

export default class MenuBar extends React.Component {
  handleLogout = () => {
    var confirmDeletion = confirm("Are you sure you want to log out?");
    if (confirmDeletion) {
      try {
        destroy("/" + this.props.userType + "/sign_out", {});
        window.location.href = "/";
      } catch (error) {
        console.log("Logout failed.")
      }
    }
  }
  
  getHomeRoute = () => {
    if (this.props.userType == "building_operator"){
      return "buildings"
    } else {
      return ""
    }
  }
  render() {
    return (
    <div className="menu">
      <Link className="btn--neutral menulink" to={"/"+this.getHomeRoute()}>
        Save and return Home
      </Link>
      <button onClick={this.handleLogout} className="btn--neutral menulink">
        Logout
      </button>
    </div>
    )
  }
}
