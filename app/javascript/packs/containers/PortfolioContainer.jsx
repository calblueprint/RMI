import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions/initialState';
import { getBuildingsByPortfolio } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PortfolioContainer extends React.Component {
  render() {
    return (<div>
      <h2>Portfolio</h2>
      <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
      <hr />
      {this.props.buildings.map(building => {
        return (<p key={building.id}>{building.name} |
          <Link to={`/buildings/${building.id}`}>Details</Link>
        </p>)
      })}
    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state) 
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    initActions: bindActionCreators({ loadInitialState }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);
