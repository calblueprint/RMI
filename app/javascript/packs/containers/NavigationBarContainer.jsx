import React from 'react';

import {loadInitialState} from '../actions/initialState';
import {getBuildings, getNavBarBuildings} from '../selectors/buildingsSelector';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DropdownMenuContainer from './DropdownMenuContainer'
import {getName, getEmail} from '../selectors/usersSelector'
import {getCurrentCategory, getCategories} from "../selectors/categoriesSelector";
import CategoryContainer from './CategoryContainer'

// import {getAnswersforBuilding, getRemainingAnswers} from "../selectors/answersSelector";


class NavigationBarContainer extends React.Component {
    componentDidMount() {
        if (window.INITIAL_STATE) {
            this.props.initActions.loadInitialState(window.INITIAL_STATE);
        }
    }

    render() {
        const username = this.props.username;
        const userEmail = this.props.userEmail;
        return (
            <div>
                <DropdownMenuContainer buildings={this.props.buildings} currentBuilding={this.props.currentBuilding}
                                       history={this.props.history}>
                </DropdownMenuContainer>
                <CategoryContainer categories={this.props.categories} currentCategory={this.props.currentCategory}
                                   currentBuilding={this.props.currentBuilding}>
                </CategoryContainer>
                <div className="userInfo">
                    {username} <br/>
                    {userEmail}
                </div>
            </div>
        )

    }
}

function mapStateToProps(state, ownProps) {
    return {
        buildings: getBuildings(state),
        currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
        userEmail: getEmail(state),
        username: getName(state),
        currentCategory: getCurrentCategory(ownProps.match.params.cId, state),
        categories: getCategories(state),
        mode: ownProps.match.params.mode,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initActions: bindActionCreators({loadInitialState}, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarContainer);
