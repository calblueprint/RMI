import React from 'react';

import { loadInitialState } from '../actions/initialState';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { patch, post } from "../fetch/requester";
import {
  addBuildingType
} from '../actions/building_type';

class PortfolioListContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (window.INITIAL_STATE) {
      this.props.initActions.loadInitialState(window.INITIAL_STATE);
    }
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const typeName = new FormData(event.target);
    try {
      let response = await post('/api/building_types', {'building_type': typeName});
      console.log(response.data);
      this.props.addBuildingType(typeName);
      console.log("success");
    } catch (error) {
      console.log("failed");
    }
  }

  render() {
    const portfolios = this.props.portfolios;
    const building_types = this.props.building_types;
    return (<div>
      <h2>Building Types</h2>
      <input type="button" value="Create New Building Type" onClick={this.handleOpenModal}></input>
      <ReactModal
        isOpen={this.state.showModal}
        ariaHideApp={false}
        shouldCloseOnEsc={true}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Add Building Type
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button onClick={this.handleCloseModal}>Close Modal</button>
      </ReactModal>
      {Object.keys(building_types).map(id => {
        return (
          <p key={id}>
            {building_types[id].name}
            <Link to={`/building_types/${id}`}>Edit</Link>
          </p>
        )
      })}
      <h2>Portfolios</h2>
      {Object.keys(portfolios).map(id => {
        return (<p key={id}>{portfolios[id].name} |
          <Link to={`/portfolios/${id}`}>Details</Link>
        </p>)
      })}
    </div>);
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
    addBuildingType: (name) => {dispatch(addBuildingType(name))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);

