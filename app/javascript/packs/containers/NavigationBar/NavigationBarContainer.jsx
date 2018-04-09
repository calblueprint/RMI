import React from 'react';
import { getBuildings, getBuildingById } from '../../selectors/buildingsSelector';
import { connect } from 'react-redux';
import DropdownMenuContainer from './DropdownMenuContainer'
import { getName, getEmail } from '../../selectors/usersSelector'
import {
  getCurrentCategory,
  getCategoriesForBuilding,
} from "../../selectors/categoriesSelector";
import CategoryContainer from './CategoryContainer';
import { getQuestionsByBuilding } from "../../selectors/questionsSelector";
import { getRemainingAnswersforCategory } from "../../selectors/answersSelector";
import { getQuestionsByCategory } from "../../utils/QuestionsFilter";


class NavigationBarContainer extends React.Component {

  render() {
    const username = this.props.username;
    const userEmail = this.props.userEmail;
    return (
      <div>
        <DropdownMenuContainer
          buildings={this.props.buildings}
          currentBuilding={this.props.currentBuilding}
          history={this.props.history}
        />

        <CategoryContainer
          categories={this.props.categories}
          currentCategory={this.props.currentCategory}
          currentBuilding={this.props.currentBuilding}
          remainingQuestions={this.props.remainingQuestions}
        />

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
  //The navigation system for categories and questions requires us to be in a building view
  const buildingView = ownProps.match.params.entity == "buildings";
  //gather questions for the building making sure we are in a building view and taking it from the id in the url
  const questions = buildingView && ownProps.match.params.id ?
    getQuestionsByBuilding(ownProps.match.params.id, state) : [];
  //likewise gathering the specific category from params of url
  const categoryId = buildingView ? ownProps.match.params.cId : null;
  const questionsByCategory = getQuestionsByCategory(categoryId, questions);
  //remaining questions is the number of questions for the category that we are viewing for a specific building
  //we check for the questions through answers of a building and a category requiring a check for the building id and
  //questions
  let remainingQuestions;
  if (!ownProps.match.params.id) {
    remainingQuestions = null;
  } else if (!questionsByCategory) {
    remainingQuestions = 0;
  } else {
    remainingQuestions = getRemainingAnswersforCategory(questionsByCategory, ownProps.match.params.id, state);
  }
  //we check to see the category provided by the params of url (which should always happen through the category rerouter if we are in
  //a building view)
  let loadCategory;
  if (!buildingView) {
    loadCategory = null;
  } else {
    loadCategory = getCurrentCategory(ownProps.match.params.cId, state);
  }
  return {
    buildings: getBuildings(state),

    currentBuilding: buildingView && ownProps.match.params.id ?
      getBuildingById(ownProps.match.params.id, state) : null,

    userEmail: getEmail(state),

    username: getName(state),

    currentCategory: loadCategory,

    categories: buildingView ?
      getCategoriesForBuilding(ownProps.match.params.id, state) : {},

    remainingQuestions: remainingQuestions,
  };
}


export default connect(
  mapStateToProps
)(NavigationBarContainer);
