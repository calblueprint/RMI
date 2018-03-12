import React from 'react';

import {loadInitialState} from '../../actions/initialState';
import {getBuildings, getBuildingById} from '../../selectors/buildingsSelector';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DropdownMenuContainer from './DropdownMenuContainer'
import {getName, getEmail} from '../../selectors/usersSelector'
import {getCurrentCategory, getCategories} from "../../selectors/categoriesSelector";
import CategoryContainer from './CategoryContainer';
import {getQuestionsByBuilding, getQuestionsByCategory} from "../../selectors/questionsSelector";
import {getRemainingAnswersforCategory} from "../../selectors/answersSelector";


class NavigationBarContainer extends React.Component {

  render() {
    const username = this.props.username;
    const userEmail = this.props.userEmail;
    return (
      <div>
        <DropdownMenuContainer
          buildings={this.props.buildings}
          currentBuilding={this.props.currentBuilding}
          history={this.props.history}>
        </DropdownMenuContainer>

        <CategoryContainer
          categories={this.props.categories}
          currentCategory={this.props.currentCategory}
          currentBuilding={this.props.currentBuilding}
          remainingQuestions={this.props.remainingQuestions}>
        </CategoryContainer>

        <div
          className="userInfo">
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

    currentBuilding: ownProps.match.params.entity == "buildings" && ownProps.match.params.id ?
      getBuildingById(ownProps.match.params.id, state) : null,

    userEmail: getEmail(state),

    username: getName(state),

    currentCategory: ownProps.match.params.cId ?
      getCurrentCategory(ownProps.match.params.cId, state) : null,

    categories: ownProps.match.params.entity == "buildings" ?
      getCategories(ownProps.match.params.id, state) : {},

    remainingQuestions: getRemainingAnswersforCategory(getQuestionsByCategory(ownProps.match.params.cId,
      ownProps.match.params.entity == "buildings" && ownProps.match.params.id ?
        getQuestionsByBuilding(ownProps.match.params.id, state) : null),
      ownProps.match.params.id,
      state)
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
