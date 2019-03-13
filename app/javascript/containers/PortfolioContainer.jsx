import React from "react";
import ReactModal from "react-modal";

import * as BuildingActions from "../actions/buildings";
import { loadInitialState } from "../actions/initialState";
import { getBuildingsByPortfolio } from "../selectors/buildingsSelector";
import { getBuildingTypes } from "../selectors/buildingTypesSelector";
import { addBuilding } from "../actions/buildings";
import { post } from "../fetch/requester";
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
    // const email = event.target.email.value;
    const buildingTypeId = document.getElementById("building").value; 
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;
    const obj = {
        name: buildingName,
        building_type_id: buildingTypeId,
        address: address,
        city: city,
        state: state,
        zip: zip,
        portfolio_id: this.props.match.params.pId,
        
      }
      console.log(obj)
    try {
      let response = await post("/api/buildings", obj);
      console.log("made it here");
      const building = { ...response.data , answers: [], questions: this.props.building_types};
      const buildingId = building.id;
      this.props.addBuilding(building);
      this.props.history.push(`/buildings/${buildingId}`);
    } catch (error) {
      console.log(error);
      this.setState({ errors: error, showModal: true });
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
          <form onSubmit={this.createBuilding}>
            <label>
              Building Name
              <input type="text" name="name" />
            </label>
            <br />
            <label>
              Email Address
              <input type="text" name="email" />
            </label>
            <br />
            <label>
              Address
              <input type="text" name="address" />
            </label>
            <br />
            <label>
              City
              <input type="text" name="city" />
            </label>
            <br />
            <label>
              State
              <input type="text" name="state" />
            </label>
            <br />
            <label>
              ZIP Code
              <input type="number" name="zip" />
            </label>
            <br />
            Building Type
            <label>
              <select>
                {Object.keys(this.props.building_types).map((building_type) => {
                  return (
                    <option type="text" id="building" value={building_type}>
                      {this.props.building_types[building_type].name}
                    </option>
                  );
                })}
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>

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
      dispatch(addBuilding(building));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);
