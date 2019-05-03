import React from "react";
import { Link } from "react-router-dom";
import { destroy } from "../../fetch/requester";
import { matchPath } from "react-router";

export default class MenuBar extends React.Component {
  handleLogout = () => {
    var confirmDeletion = confirm("Are you sure you want to log out?");
    if (confirmDeletion) {
      try {
        destroy("/" + this.props.userType + "/sign_out", {});
        window.location.href = "/";
      } catch (error) {
        console.log("Logout failed.");
      }
    }
  };

  getHomeRoute = () => {
    if (this.props.userType == "building_operator") {
      return "buildings";
    } else if (this.props.userType == "rmi_user") {
      return "portfolios";
    } else {
    }
  };

  // getBackButton() {
  //   if (matchPath(this.props.location.pathname, '/buildings/:id') ||
  //   matchPath(this.props.location.pathname, '/building_types/:id')){
  //     return (
  //       <Link className="btn--neutral menulink" to={"/"+this.getHomeRoute()}>
  //         Save and return Home
  //       </Link>)
  //   } else {
  //       <Link className="btn--neutral menulink" to={"/"+this.getHomeRoute()}>
  //         homeicon
  //       </Link>)
  //   }
  // }

  render() {
    return (
      <div className="menu">
        {/*getBackButton()*/}
        <Link className="btn--neutral menulink" to={"/" + this.getHomeRoute()}>
          poop
        </Link>
        <button
          onClick={this.handleLogout}
          className="btn--neutral menulink logout-btn"
        >
          Logout
        </button>
      </div>
    );
  }
}
