import React from 'react';
import PropTypes from 'prop-types';
import PortfolioBuildingInfoContainer from './PortfolioBuildingInfoContainer';
import CategoryDetailsContainer from './CategoryDetailsContainer';
import { get } from '../fetch/requester';
import { connect } from "react-redux";
import { questionDataPerCategory } from '../selectors/answersSelector';

class PortfolioBuildingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userData: null};
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedBuildingId !== this.props.selectedBuildingId) {
          this.getUserData();
        }
    }

    async getUserData() {
        let building_id = this.props.selectedBuildingId;
        try {
            let response = await get('/api/buildings/' + building_id + '/get_user_data');
            this.setState({userData: response.data});
            return response.data;
        } catch (error) {
            return {};
        }
    }

    showSelectedBuilding(selectedBuildingId) {
        let buildings = this.props.buildings;
        let pId = this.props.portfolio_id;
        let categoriesData = this.props.categoriesData;

        return buildings.map((b) => {
          if (b.id === selectedBuildingId) {
            return (<PortfolioBuildingInfoContainer key={b.id} 
                                                    building_id={b.id} 
                                                    portfolio_id={pId}
                                                    categoriesData={categoriesData}>
                    </PortfolioBuildingInfoContainer>)
          }
        })
      }
    
      showSelectedCategory(selectedBuildingId, selectedCategoryId) {
        let buildings = this.props.buildings;
        let pId = this.props.portfolio_id;
        let categoriesData = this.props.categoriesData
        return buildings.map((b) => {
          if (b.id === selectedBuildingId && selectedCategoryId) {
            return (<CategoryDetailsContainer userData={this.state.userData}
                                              categoryData={categoriesData[selectedCategoryId]}
                                              key={b.id}
                                              building_id={b.id}
                                              building_name={b.name}
                                              portfolio_id={pId.id}
                                              category_id={selectedCategoryId}>
                    </CategoryDetailsContainer>)
          }
        })
      }


      render() {
        let selectedBuildingId = this.props.selectedBuildingId;
        let selectedCategoryId = this.props.selectedCategoryId;
    
        return (<div className='portfolio_building_container'>
            <div>{this.showSelectedBuilding(selectedBuildingId)}</div>
            <div className='building_category_details'>{this.showSelectedCategory(selectedBuildingId, selectedCategoryId)}</div>
          </div>);
      }
}

PortfolioBuildingContainer.propTypes = {
    portfolio_id: PropTypes.string.isRequired,
    buildings: PropTypes.array.isRequired,
    selectedBuildingId: PropTypes.number.isRequired,
    selectedCategoryId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
      // array containing an object for each category id, name, number of answered questions, and total questions
      categoriesData: questionDataPerCategory(ownProps.selectedBuildingId, state),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioBuildingContainer);
