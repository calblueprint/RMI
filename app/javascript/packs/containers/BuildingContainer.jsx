import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class BuildingContainer extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/portfolios/1/buildings/${this.props.id}`}>ID: {this.props.id}</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(
  mapStateToProps
)(BuildingContainer)