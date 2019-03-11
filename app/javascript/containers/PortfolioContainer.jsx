import React from "react";
import ReactModal from "react-modal";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { addBuilding } from "../actions/building";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createBuilding = this.createBuilding.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  async createBuilding(event) {
    event.preventDefault();
    const buildingName = event.target.name.value;
    const email = event.target.email.value;
    const buildingTypeId = event.target.id.value;
    try {
      let response = await post("/api/building", {
        name: buildingName,
        building_type_id: buildingTypeId
      });
      const building = { ...response.data};
      const buildingId = building.id;
      this.props.addBuilding(building);
      this.props.history.push(`/building_types/${buildingId}`);
    } catch (error) {
      this.setState({errors: error, showModal: true})
    }
  }

  render() {
    return (
      <div>
        <h2>Portfolio</h2>
        <a href={`download/${this.props.match.params.pId}`}>Download as CSV</a>
        <hr />
        <input
          type="button"
          value="Create New Building"
          onClick={this.toggleModal}
        />
        <ReactModal isOpen={this.state.showModal}>
          <form onSubmit={this.createBuildingType}>
              Building Name
              <input type="text" name="name" />
              <br />

              Email Address
              <input type="text" email="email" />
              <br />
              Building Type
            <select>
              {Object.keys(this.props.building_types).map(building_type => {
                return (
                  <option type="type" id={building_type}>{this.props.building_types[building_type].name}</option>
                  )
              })}
            </select>

          </form>
          <input type="submit" value="Submit" />
          <div>{this.state.errors}</div>
          <button onClick={this.toggleModal}>Close Modal</button>
        </ReactModal>
        <div className="building__container">
          {this.props.buildings.map(building => {
            return (
              <div className="building__row" key={building.id}>
                <div className="building__details">
                  <h3>{building.name}</h3>
                  <p>{building.address}</p>
                </div>
                <span className="building__link">
                  <Link to={`/buildings/${building.id}`}>Details</Link>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state),
    building_types: getBuildingTypes(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    initActions: bindActionCreators({ loadInitialState }, dispatch),
    addBuilding: building => {
      dispatch(addBuilding(building, portfolioId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);
