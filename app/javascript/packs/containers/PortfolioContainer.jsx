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
      <div className="building__container">
      {this.props.buildings.map(building => {
        return (<div className="building__row" key={building.id}>
            <div className="building__details">
              <h3>{building.name}</h3>
              <p>{building.address}</p>
            </div>
            <span className="building__link">
              <Link to={`/buildings/${building.id}`}>Details</Link>
            </span>
        </div>)
      })}
      </div>
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
