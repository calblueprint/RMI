import React from 'react';

import * as BuildingActions from '../actions/buildings';
import * as ViewContextActions from '../actions/viewContext';
import { loadInitialState } from '../actions/initialState';
import { getBuildings } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BuildingListContainer extends React.Component {
  componentDidMount() {
    if (window.INITIAL_STATE) {
      this.props.initActions.loadInitialState(window.INITIAL_STATE);
      window.INITIAL_STATE = null;
    }
    this.props.viewContextActions.setBuildingDashboardView();
  }

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
}

  function mapStateToProps(state) {
    return {
      buildings: getBuildings(state)
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      buildingActions: bindActionCreators(BuildingActions, dispatch),
      initActions: bindActionCreators({ loadInitialState }, dispatch),
      viewContextActions: bindActionCreators(ViewContextActions, dispatch)
    };
  }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingListContainer);
