import React from 'react';

import * as BuildingActions from '../actions/buildings';
import { loadInitialState } from '../actions/initialState';
import { getBuildingsByPortfolio } from '../selectors/buildingsSelector';
import { getPortfolioName, getSelectedBuildingId, getSelectedCategoryId } from '../selectors/portfolioSelector';
import { Link } from "react-router-dom";
import Logo from "../rmi-logo.png";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PortfolioBuildingDetailsContainer from './PortfolioBuildingDetailsContainer';
import PortfolioBuildingInfoContainer from './PortfolioBuildingInfoContainer';
import CategoryDetailsContainer from './CategoryDetailsContainer';

class PortfolioContainer extends React.Component {
  groupBuildingsByType() {
    let buildingTypesDic = {};
    let buildings = this.props.buildings;
    for (let i = 0; i < buildings.length; i++) {
      let id = buildings[i].building_type_id;
      if (buildingTypesDic[id] == null) {
        buildingTypesDic[id] = [buildings[i]]
      } else {
        buildingTypesDic[id].push(buildings[i]);
      }
    }
    return buildingTypesDic;
  }

  showSelectedBuilding(selectedBuildingId) {
    let buildings = this.props.buildings;
    let pId = this.props.match.params.pId;

    for (let i = 0; i < buildings.length; i++) {
      let b = buildings[i];
      if (b.id === selectedBuildingId) {
        return (<PortfolioBuildingInfoContainer key={b.id} building_id={b.id} portfolio_id={pId}>
                </PortfolioBuildingInfoContainer>)
      }
    }
  }

  showSelectedCategory(selectedBuildingId, selectedCategoryId) {
    let buildings = this.props.buildings;
    let pId = this.props.match.params.pId;

    for (let i = 0; i < buildings.length; i++) {
      let b = buildings[i];
      if (b.id === selectedBuildingId && selectedCategoryId) {
        return (<CategoryDetailsContainer key={b.id} building_id={b.id} portfolio_id={pId} category_id={selectedCategoryId}>
                </CategoryDetailsContainer>)
      }
    }
  }
  
  render() {
    let buildingByType = this.groupBuildingsByType();
    let portfolioId = this.props.match.params.pId;
    let selectedBuildingId = this.props.selectedBuildingId;
    let selectedCategoryId = this.props.selectedCategoryId;

    return (
    <div className="portfolio__container">
    
      <div className="portfolio__header">
      <div>
            <Link to="/">
              <img src={Logo} draggable={false} />
            </Link>
      </div>
      <div>
        <span className='small_header'>PORTFOLIO</span>
        <h2>{this.props.portfolioName}</h2>
      </div>
      </div>
      <div className="building__container">
        <div className="building__types">
          {Object.keys(buildingByType).map((typeId, i) => {
            return (<PortfolioBuildingDetailsContainer  key={i}
                                                        portfolioId={portfolioId}
                                                        buildings={buildingByType[typeId]} 
                                                        buildingTypeId={typeId} 
                                                        match={this.props.match}
                                                        selectedBuildingId={selectedBuildingId}>
                    </PortfolioBuildingDetailsContainer>)
          })}
        </div>
        <div className="building__details">
        {this.showSelectedBuilding(selectedBuildingId)}
        </div>
        <div className="building_category_details">
        {this.showSelectedCategory(selectedBuildingId, selectedCategoryId)}
        </div>
      </div>
    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    portfolioName: getPortfolioName(ownProps.match.params.pId, state),
    buildings: getBuildingsByPortfolio(ownProps.match.params.pId, state),
    selectedBuildingId: getSelectedBuildingId(ownProps.match.params.pId, state), 
    selectedCategoryId: getSelectedCategoryId(ownProps.match.params.pId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buildingActions: bindActionCreators(BuildingActions, dispatch),
    initActions: bindActionCreators({ loadInitialState }, dispatch), 
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioContainer);

