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
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      buildingTypes: this.props.building_types
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
    console.log("reached");
    event.preventDefault();
    const typeName = event.target.name.value;
    try {
      let response = await post('/api/building_types', {'name': typeName});
      console.log(response.data);
      
      console.log(this.state.buildingTypes);
      console.log('data here');
      const buildingTypeId = response.data.id;
      this.props.addBuildingType(typeName, buildingTypeId);
      this.setState({buildingTypes: this.state.buildingTypes, showModal: false})
      console.log(this.state.buildingTypes);
      // this.props.history.push('/building_type/'+ buildingTypeId);
      console.log("success");
      
    } catch (error) {
      console.log("failed");
    }

    
  }

  render() {
    const portfolios = this.props.portfolios;
    const building_types = this.props.building_types;
    // console.log(Object.keys(building_types));
    // console.log(Object.keys(this.state.buildingTypes));
    console.log("hihih");
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
    addBuildingType: (typeName, buildingTypeId) => {dispatch(addBuildingType(typeName, buildingTypeId))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);

