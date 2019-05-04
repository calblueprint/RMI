import React from "react";
import { Link } from "react-router-dom";
import { destroy } from '../../fetch/requester';
import { matchPath, withRouter } from 'react-router';
import homeIcon from "@fortawesome/fontawesome-free-solid/faHome"
import arrowLeft from "@fortawesome/fontawesome-free-solid/faArrowLeft"

import FAIcon from "../../components/FAIcon"

class MenuBar extends React.Component {
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
    console.log(this.props.userType)
    console.log(typeof this.props.userType)
    if (this.props.userType == "building_operator"){
      return "buildings"
    } else if (String(this.props.userType) == "RMIUser"){
      console.log("Rmi")
      return "portfolios"
    } else {
      return "portfolios/1"
    }
  }

  getBackButton = () => {
    if (matchPath(this.props.location.pathname, '/buildings/:id') ||
    matchPath(this.props.location.pathname, '/building_types/:id')){
      return (
        <Link className="btn--neutral menulink" to={"/"+this.getHomeRoute()}>
          <FAIcon iconObj={arrowLeft}/>
          <span className="linkmargins">Save and return Home</span>
        </Link>)
    } else {
        return (<Link className="btn--neutral menulink" to={"/"+this.getHomeRoute()}>
          <FAIcon iconObj={homeIcon}/>
        </Link>)
    }
  }

  render() {
    return (
    <div className="menu">
      {this.getBackButton()}
      <button onClick={this.handleLogout} className="btn--neutral menulink logout-btn">
        Logout
      </button>
    </div>
    )
  }
}

export default withRouter(MenuBar)
