import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { getBuildings } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BuildingInfoContainer, { } from './BuildingInfoContainer';
import ContinueButtonContainer from './ContinueButtonContainer';
import NotificationBarContainer from './NotificationBarContainer';

class BuildingListContainer extends React.Component {
  render() {
    const buildings = this.props.buildings;
    return (<div className='building_list_container'>
      <h1>Buildings</h1>
      <div className='building_list'>
      <hr />
      {Object.keys(buildings).map(id => {
        return (<div key={id} className='building_view'>
          <NotificationBarContainer building_id={id}></NotificationBarContainer>
          <BuildingInfoContainer building_id={id} className='building_view_info'></BuildingInfoContainer>
          <ContinueButtonContainer building_id={id}></ContinueButtonContainer>
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
