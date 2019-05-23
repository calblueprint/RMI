import React from "react";
import PropTypes from "prop-types";
import PortfolioBuildingInfoContainer from "./PortfolioBuildingInfoContainer";
import CategoryDetailsContainer from "./CategoryDetailsContainer";
import { post } from "../fetch/requester";
import { connect } from "react-redux";
import { questionDataPerCategory } from "../selectors/answersSelector";
import DelegationContactCard from "../components/DelegationContactCard";
import DelegationPopover from "../components/DelegationPopover";

import { getAssetManagerEmails, getPortfolioName } from "../selectors/portfoliosSelector";
import { addAssetManager } from "../actions/portfolios";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import { getProgressForPortfolio } from "../selectors/answersSelector";

import FAIcon from "../components/FAIcon";
import buildingIcon from "@fortawesome/fontawesome-free-solid/faBuilding";
import checklist from "@fortawesome/fontawesome-free-solid/faTasks";

/* Renders the two main containers for the portfolio view according to the selected building
and selected category and handles the GET request for the login times needed to see the last time
another user was active.
*/
class PortfolioOverviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async assignAssetManager(assetManager) {
    try {
      const portfolio = this.props.portfolio;
      let response = await post("/api/portfolios/" + portfolio.id + "/add_asset_manager", {
        id: portfolio.id,
        first_name: assetManager.firstName,
        last_name: assetManager.lastName,
        email: assetManager.email
      });
      const updatedPortfolio = response.data;
      this.props.addAssetManager(assetManager, portfolio.id);
    } catch (error) {
      console.log(error)
    }
  }

  contactCard(c) {
    if (c) {
      let email = c.email;
      let firstName = c.firstName;
      let lastName = c.lastName;
  
      return <DelegationContactCard
              firstName={firstName}
              lastName={lastName}
              email={email}
              handleClickChangeContact={() => {}}
              handleClickRemoveContact={() => {}}
              showHeader={false}
              showChangeBtn={false}
              showRemoveContactBtn={false}
      />
    }
  }

  render() {

    return (
        <div className="building__details portfolio__overview">
          <div className="building_info">
            <div>
              <h2>
                Portfolio Overview
              </h2>
            </div>
            <div>
              <DelegationPopover
                    label="Add Asset Manager"
                    onSelectedContact={(contact) => this.assignAssetManager(contact)}
                    // disabled={this.isDisabled()}
              />
            </div>
          </div>
          <br />
          <span className="small_header">Asset Managers</span>
          <div className="asset_manager_contacts">
            {this.props.assetManagerContacts.map(contact => {
              return this.contactCard(contact)
            })}
          </div>
          <br />
          <span className="small_header">Progress</span>
          
          <h4>
            <FAIcon
                  iconObj={checklist}
            /> 
            Number of Incomplete Buildings: {this.props.progress["unanswered"]}</h4>
          <h4>
            <FAIcon
                  iconObj={buildingIcon}
            />
             Number of Total Buildings: {this.props.progress["total"]}</h4>
        </div>
    );
  }
}

PortfolioOverviewContainer.propTypes = {
  portfolio_id: PropTypes.string.isRequired,

};

function mapStateToProps(state, ownProps) {
  return {
    portfolio: state.portfolios[ownProps.portfolio_id],
    portfolioName: getPortfolioName(ownProps.portfolio_id, state),
    // assetManagerContacts: [{email:"test@test.test", firstName:"divi", lastName:"test"}, {email:"test@test.test", firstName:"divi", lastName:"test"},  {email:"test@testtesettest.test", firstName:"divi", lastName:"test"},  {email:"test@test.test", firstName:"divi", lastName:"test"}],
    assetManagerContacts: getAssetManagerEmails(ownProps.portfolio_id, state),
    progress: getProgressForPortfolio(ownProps.portfolio_id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAssetManager: (userDetails, portfolioId) => dispatch(addAssetManager(userDetails, portfolioId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioOverviewContainer);
