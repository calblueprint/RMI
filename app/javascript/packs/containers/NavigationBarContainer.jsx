import React from 'react';

import { loadInitialState } from '../actions/initialState';
import { getBuildings, getNavBarBuildings } from '../selectors/buildingsSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownMenuContainer from './DropdownMenuContainer'
//import CategoryContainer from 'CategoryContainer'
// import {getAnswersforBuilding, getRemainingAnswers} from "../selectors/answersSelector";


class NavigationBarContainer extends React.Component {
    componentDidMount() {
        if (window.INITIAL_STATE) {
            this.props.initActions.loadInitialState(window.INITIAL_STATE);
        }
    }
    render() {
        return(
            <DropdownMenuContainer buildings = {this.props.buildings} currentBuilding = {this.props.currentBuilding}>
            </DropdownMenuContainer>
            // <CategoryContainer currentCategory = {this.props.currentCategory} categories = {this.props.categories} numAnswers = {this.props.numAnswers}>

        )

    }
}

function mapStateToProps(state, ownProps) {
    return {
        buildings: getBuildings(state),
        currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
        // currentCategory: getCurrentCategory(ownProps.match.params.entity, ownProps.match.params.id, state),
        // categories:  getCategories(ownProps.match.params.entity, ownProps.match.params.id, state),
        // numAnswers: getRemainingAnswers(getAnswersforBuilding(ownProps.match.params.entity, ownProps.match.params.id, state))
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initActions: bindActionCreators({ loadInitialState }, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarContainer);
