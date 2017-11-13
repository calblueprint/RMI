import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class AssetManagerApp extends React.Component {
  componentDidMount() {
    if (window.INITIAL_STATE) {
      this.props.initActions.loadInitialState(window.INITIAL_STATE);
    }
  }

  render() {
    const buildings = this.props.buildings;
    return (<div>
      <h2>Buildings</h2>
      {Object.keys(buildings).map(id => {
        return (<p key={id}>{buildings[id].name} | <a href={`/buildings/${id}`}>Details</a></p>);
      })}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    buildings: state.buildings
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
)(AssetManagerApp);
