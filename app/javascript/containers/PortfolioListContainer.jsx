import React from "react";
import ReactModal from "react-modal";

import { loadInitialState } from "../actions/initialState";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { post } from "../fetch/requester";
import { addBuildingType } from "../actions/building_type";

class PortfolioListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false, 
      errors: null
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createBuildingType = this.createBuildingType.bind(this);
  }

  toggleModal() {
    this.setState({ errors: null, showModal: !this.state.showModal });
  }

  async createBuildingType(event) {
    event.preventDefault();
    const typeName = event.target.name.value;
    try {
      let response = await post("/api/building_types", {
        name: typeName,
        categories: []
      });
      const buildingType = { ...response.data, questions: [] };
      const buildingTypeId = buildingType.id;
      this.props.addBuildingType(buildingType);
      //before pushing to the next page, the building must have a building type, with questions and categories automatically delegated to the user
      //delegate questions
      //this.props.delegateQuestions()
      this.props.history.push(`/building_types/${buildingTypeId}`);
    } catch (error) {
      this.setState({errors: error, showModal: true});
    }
  }

  render() {
    const portfolios = this.props.portfolios;
    const building_types = this.props.building_types;
    return (
      <div>
        <h2>Building Types</h2>
        <input
          type="button"
          value="Create New Building Type"
          onClick={this.toggleModal}
        />
        <ReactModal isOpen={this.state.showModal}>
          <form onSubmit={this.createBuildingType}>
            <label>
              Add Building Type
              <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div>{this.state.errors}</div>
          <button onClick={this.toggleModal}>Close Modal</button>
        </ReactModal>
        {Object.keys(building_types).map(id => {
          return (
            <p key={id}>
              {building_types[id].name}
              <Link to={`/building_types/${id}`}>Edit</Link>
            </p>
          );
        })}
        <h2>Portfolios</h2>
        {Object.keys(portfolios).map(id => {
          return (
            <p key={id}>
              {portfolios[id].name} |
              <Link to={`/portfolios/${id}`}>Details</Link>
            </p>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    portfolios: state.portfolios,
    building_types: state.building_types
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initActions: bindActionCreators({ loadInitialState }, dispatch),
    addBuildingType: buildingType => {
      dispatch(addBuildingType(buildingType));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);
