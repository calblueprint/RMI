import React from "react";
import PropTypes from "prop-types";
import PortfolioBuildingInfoContainer from "./PortfolioBuildingInfoContainer";
import CategoryDetailsContainer from "./CategoryDetailsContainer";
import { get } from "../fetch/requester";
import { connect } from "react-redux";
import { questionDataPerCategory } from "../selectors/answersSelector";
import DelegationContactCard from "../components/DelegationContactCard";
import DelegationPopover from "../components/DelegationPopover";
import getAssetManagerEmails from "../selectors/portfoliosSelector";
import { addAssetManager } from "../actions/portfolios";


/* Renders the two main containers for the portfolio view according to the selected building
and selected category and handles the GET request for the login times needed to see the last time
another user was active.
*/
class PortfolioOverviewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  async assignAssetManager(assetManager, portfolio) {
    try {
      let response = await post("/api/portfolios/add_asset_manager", {
        id: portfolio.id,
        first_name: assetManager.first_name,
        last_name: assetManager.last_name,
        email: assetManager.email
      });
      const updatedPortfolio = response.data;
      this.props.addAssetManger(assetManager, portfolio.id);
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    return (
      <div className="building__details" >
        <div className="building_info">
          <div>
            <span className="small_header">Portfolio</span>
            <h2>
              PORTFOLIO
            </h2>
          </div>
          <div>
            <DelegationPopover
                  label="Add Asset Manager"
                  onSelectedContact={(contact) => this.assignAssetManager(contact, this.props.portfolio_id)}
                  // disabled={this.isDisabled()}
            />
          </div>
        </div>
        <br />
        {this.props.assetManagerEmails.map((email) => {
          return (
            <div>
              {email} 
            </div>
            )
        })}
      </div>
    );
  }
}

PortfolioOverviewContainer.propTypes = {
  portfolio_id: PropTypes.string.isRequired,

};

function mapStateToProps(state, ownProps) {
  return {
    assetManagerEmails: ["test1@test.com", "test2@test.com"]
    // assetManagerEmails: getAssetManagerEmails(ownProps.portfolio_id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAssetManager: (userDetails, portfolioId) => addAssetManager(userDetails, portfolioId, state)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioOverviewContainer);
