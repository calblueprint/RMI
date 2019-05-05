import React from 'react';
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom';
import {
  getPortfolioId
} from "../selectors/portfoliosSelector";
import { getQuestionsByBuilding } from "../selectors/questionsSelector";

class PortfolioRerouter extends React.Component {
  render() {
    return (
      <Redirect to={`/portfolios/${this.props.portfolioId}`}/>
      // (this.props.portfolioId ? <Redirect to={`/portfolios/${this.props.portfolioId}`}/> :
      //   <Redirect to={`/`}/>)
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    portfolioId: getPortfolioId(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioRerouter);
