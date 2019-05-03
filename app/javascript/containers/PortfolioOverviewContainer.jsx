import React from "react";
import PropTypes from "prop-types";
import PortfolioBuildingInfoContainer from "./PortfolioBuildingInfoContainer";
import CategoryDetailsContainer from "./CategoryDetailsContainer";
import { get } from "../fetch/requester";
import { connect } from "react-redux";
import { questionDataPerCategory } from "../selectors/answersSelector";
 import DelegationContactCard from "../components/DelegationContactCard";

/* Renders the two main containers for the portfolio view according to the selected building
and selected category and handles the GET request for the login times needed to see the last time
another user was active.
*/
class PortfolioBuildingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loginUserData: null };
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
                  // onSelectedContact={(contact) => delegateQuestions(contact, this.props.addAnswers)}
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

PortfolioBuildingContainer.propTypes = {
  portfolio_id: PropTypes.string.isRequired,
  buildings: PropTypes.array.isRequired,

};

function mapStateToProps(state, ownProps) {
  return {
    assetManagerEmails: questionDataPerCategory(ownProps.portfolio_id, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioOverviewContainer);
