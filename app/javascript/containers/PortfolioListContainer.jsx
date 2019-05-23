import React from "react";
import ReactModal from "react-modal";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { loadInitialState } from "../actions/initialState";
import { addBuildingType } from "../actions/building_type";
import { addPortfolio } from "../actions/portfolios";

import { post } from "../fetch/requester";

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
        name: portfolioName
      });
      const portfolio = { ...response.data };
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
      <div className="tables_container">
        <div>
          <div>
            <h2>Building Types</h2>
            <p><i>Each building type is associated with a fixed set of questions, which will be sent out
              for all buildings of that type.</i></p>
            <br/>
            <button
              className={"btn btn--primary"}
              value="Create New Building Type"
              onClick={() => this.toggleModal("building")}
            >
              +Create New Building Type
            </button>
            <table className="table_view">
              <tbody className="table_data">
                {Object.keys(building_types).map(id => {
                  return (
                    <tr key={id} className="table_view--row"
                        onClick={() => this.props.history.push(`/building_types/${id}`)}>
                      <td className="field_name">{building_types[id].name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div class="portfolio-list">
          <h2>Portfolios</h2>
          <p><i>Create a portfolio for each new project. Clients will only have access to data within
            their project's portfolio.</i></p>
          <br/>
          <button
            className={"btn btn--primary"}
            value="Create New Portfolio"
            onClick={() => this.toggleModal("portfolio")}
          >
            +Create New Portfolio
          </button>
          <table className="table_view">
            <tbody className="table_data">
              {Object.keys(portfolios).map(id => {
                return (
                  <tr key={id} className="table_view--row"
                      onClick={() => this.props.history.push(`/portfolios/${id}`)}>
                    <td className="field_name">{portfolios[id].name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ReactModal className="modal" isOpen={this.state.showModal} ariaHideApp={false}>
          {this.state.mode === "building" ? (
            <form onSubmit={this.createBuildingType}>
            <h2>New Building Type</h2>
              <label>
                <h4>Building Type Name</h4>
                <input type="text" name="building" />
              </label>
              <div>{this.state.errors ? this.state.errors.map(error =>
                <div style={{"color": "red"}}>{error}</div>) : null}
              </div>
                <input className="btn btn--primary"
                     type="submit" value="Submit" />
              <button className="btn btn--secondary" onClick={this.toggleModal}>Cancel</button>
            </form>
          ) : (
            <form onSubmit={this.createPortfolio}>
            <h2>New Portfolio</h2>
              <label>
                <h4>Portfolio Name</h4>
                <input type="text" name="portfolio" required="required" />
              </label>
              <div>{this.state.errors ? this.state.errors.map(error =>
                <div style={{"color": "red"}}>{error}</div>) : null}
              </div>
              <input className="btn btn--primary"
                     type="submit" value="Submit" />
              <button className="btn btn--secondary" onClick={this.toggleModal}>Cancel</button>
            </form>
          )}
        </ReactModal>
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
      dispatch(addPortfolio(portfolio));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);
