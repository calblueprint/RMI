import React from 'react';
import { connect } from 'react-redux';
import BuildingContainer from './BuildingContainer';

class PortfolioContainer extends React.Component {
  handleBuildingClick(bId) {
    console.log("Building clicked - " + bId);
  }

  render() {
    return (
      <div>
        <h2>PortfolioContainer</h2>
        {Object.keys(this.props.buildings).map(bId =>
          <BuildingContainer key={bId} id={bId} onClick={() => this.handleBuildingClick(bId)} />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    buildings: {
      1: {}, 2: {}, 3: {}
    }
  }
}

export default connect(
  mapStateToProps
)(PortfolioContainer)