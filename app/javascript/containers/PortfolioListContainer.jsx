import React from "react";
import ReactModal from "react-modal";

import { loadInitialState } from "../actions/initialState";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { post } from "../fetch/requester";
import { addBuildingType } from "../actions/building_type";
import { addPortfolio } from "../actions/portfolios";

class PortfolioListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      errors: null,
      mode: "building"
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.createBuildingType = this.createBuildingType.bind(this);
    this.createPortfolio = this.createPortfolio.bind(this);
  }

  toggleModal(type) {
    this.setState({
      errors: null,
      showModal: !this.state.showModal,
      mode: type
    });
  }

  async createBuildingType(event) {
    event.preventDefault();
    const typeName = event.target.building.value;
    try {
      let response = await post("/api/building_types", {
        name: typeName,
        categories: []
      });
      const buildingType = { ...response.data, questions: [] };
      const buildingTypeId = buildingType.id;
      this.props.addBuildingType(buildingType);
      this.props.history.push(`/building_types/${buildingTypeId}`);
    } catch (error) {
      this.setState({ errors: error, showModal: true });
    }
  }

  async createPortfolio(event) {
    event.preventDefault();
    const portfolioName = event.target.portfolio.value;
    try {
      let response = await post("/api/portfolios", {
        name: portfolioName,
      });
      const portfolio = { ...response.data };
      console.log('after api')
      console.log(portfolio)
      const portfolioId = portfolio.id;
      this.props.addPortfolio(portfolio);
      this.props.history.push(`/portfolios/${portfolioId}`);
    } catch (error) {
      this.setState({ errors: error, showModal: true });
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
          onClick={() => this.toggleModal("building")}
        />
        <ReactModal isOpen={this.state.showModal} ariaHideApp={false}>
          {this.state.mode === "building" ? (
            <form onSubmit={this.createBuildingType}>
              <label>
                Add Building Type
                <input type="text" name="building" />
              </label>
              <input type="submit" value="Submit" />
            </form>
          ) : (
            <form onSubmit={this.createPortfolio}>
              <label>
                Portfoio Name
                <input type="text" name="portfolio" required="required"/>
              </label>
              <br/>
              <label>
                Asset Manager First Name
                <input type="text" name="first" required="required"/>
              </label>
              <br/>
              <label>
                Asset Manager Last Name
                <input type="text" name="last" required="required"/>
              </label>
              <input type="submit" value="Submit" />
            </form>
          )}

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
        <input
          type="button"
          value="Create New Portfoio"
          onClick={() => this.toggleModal("portfolio")}
        />
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
    },
    addPortfolio: portfolio => {
      dispatch(addPortfolio(portfolio))
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);
