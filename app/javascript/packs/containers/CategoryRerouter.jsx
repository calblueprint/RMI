import React from 'react';
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom';
import {
  getFirstUnansweredCategory,
  getCategoriesForBuilding
} from "../selectors/categoriesSelector";
import {getQuestionsByBuilding} from "../selectors/questionsSelector";

class CategoryRerouter extends React.Component {
  render() {
    return (
      (this.props.categoryId ? <Redirect to={`${this.props.match.url}/edit/${this.props.categoryId}`}/> :
        <Redirect to={`${this.props.match.url}/review`}/>)
    )
  }
}

//takes in your current building and reroutes the page to the first unanswered category that persists in the state
//under this building
function mapStateToProps(state, ownProps) {
  const questions = getQuestionsByBuilding(ownProps.match.params.bId, state);
  let categories = getCategoriesForBuilding(ownProps.match.params.bId, state);
  let loadCategory = getFirstUnansweredCategory(categories, questions, ownProps.match.params.bId, state);
  return {
    categoryId: loadCategory ? loadCategory.id : null,
  }
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryRerouter);
