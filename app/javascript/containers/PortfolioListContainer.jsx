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
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (window.INITIAL_STATE) {
      this.props.initActions.loadInitialState(window.INITIAL_STATE);
    }
  }

  toggleModal () {
    this.setState({ showModal: !this.state.showModal });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const typeName = event.target.name.value;
    try {
      let response = await post('/api/building_types', {'name': typeName});
      const buildingTypeId = response.data.id;
      console.log(response.data)
      this.props.addBuildingType(typeName, buildingTypeId);
      // this.state.buildingTypes[buildingTypeId] = response.data;
      this.setState({buildingTypes: this.props.building_types, showModal: false})
      console.log(this.state.buildingTypes);
      console.log(this.props.building_types);
      console.log("success");
      // this.props.history.push('/building_type/'+ buildingTypeId);
      
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
      <input type="button" value="Create New Building Type" onClick={this.toggleModal}></input>
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
        <button onClick={this.toggleModal}>Close Modal</button>
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
    building_types: state.building_types,
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

