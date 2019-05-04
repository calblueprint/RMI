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
    if (String(this.props.userType) == "BuildingOperator"){
      return "buildings"
    } else if (String(this.props.userType) == "RMIUser"){
      return "portfolios"
    } else if (String(this.props.userType) == "AssetManager"){
      return "portfolios/1"
    } else {
      return ""
    }
  }

  getBackButton = () => {
    if (matchPath(this.props.location.pathname, '/buildings/:id') ||
    matchPath(this.props.location.pathname, '/building_types/:id')){
      return (
        <Link className="menulink" to={"/"+this.getHomeRoute()}>
          <FAIcon iconObj={arrowLeft}/>
          <span className="linkmargins">Save and return Home</span>
        </Link>)
    } else {
        return (<Link className="menulink" to={"/"+this.getHomeRoute()}>
          <FAIcon iconObj={homeIcon}/>
        </Link>)
    }
  }

  render() {
    return (
    <div className="menu">
      {this.getBackButton()}
      <button onClick={this.handleLogout} className="menulink logout-btn">
        Logout
      </button>
    </div>
    )
  }
}

export default withRouter(MenuBar)
