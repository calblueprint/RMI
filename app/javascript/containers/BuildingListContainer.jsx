import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { getBuildings } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BuildingInfoContainer, { } from './BuildingInfoContainer';

class BuildingListContainer extends React.Component {
  render() {
    const buildings = this.props.buildings;
    return (<div className='building_list_container'>
      <h2>Buildings</h2>
      <div className='building_list'>
      <hr />
      {Object.keys(buildings).map(id => {
        return (<div key={id} className='building_view'>
          <BuildingInfoContainer building_id={id} className='building_view_info'></BuildingInfoContainer>
          <div className="continue-button"><Link to={`/buildings/${id}`} className="continue-link">Continue</Link></div>
        </div>)
      })}
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    buildings: getBuildings(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingListContainer);


/* class BuildingListContainer extends React.Component {
  render() {
    const buildings = this.props.buildings;
    return (<div>
      <h2>Buildings</h2>
      <hr />
      {Object.keys(buildings).map(id => {
        return (<p key={id}>{this.props.buildings[id].name} |
          <Link to={`/buildings/${id}`}>Details</Link>
        </p>)
      })}
    </div>);
  }
} */