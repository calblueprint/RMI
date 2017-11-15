import React from 'react';
import { connect } from 'react-redux';

class BuildingContainer extends React.Component {
  render() {
    return (
      <div>
        <p>Building container!!</p>
        <p>ID: {this.props.match.params.bId}</p>
      </div>
    );
  }
}

export default BuildingContainer