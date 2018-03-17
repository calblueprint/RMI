import React from 'react';
import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom';
import {
  getCurrentCategory,
  getFirstUnansweredCategory,
  getCategoriesForBuilding
} from "../selectors/categoriesSelector";

class CategoryRerouter extends React.Component {
  render() {
    return (
      (this.props.categoryId ? <Redirect to={`${this.props.match.url}/edit/${this.props.categoryId}`}/> :
        <Redirect to={`${this.props.match.url}/review`}/>)
    )
  }
}

function mapStateToProps(state, ownProps) {
  const buildingView = ownProps.match.params.entity == "buildings";
  const questions = buildingView && ownProps.match.params.id ?
    getQuestionsByBuilding(ownProps.match.params.id, state) : [];
  let loadCategory;
  if (!buildingView) {
    loadCategory = null;
  }
  else if (!ownProps.match.params.cId) {
    // need category ids
    //need questions by their categories
    let categories = getCategoriesForBuilding(ownProps.match.params.id, state);
    loadCategory = getFirstUnansweredCategory(categories, questions, ownProps.match.params.id, state);
  } else {
    loadCategory = getCurrentCategory(ownProps.match.params.cId, state)
  }
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
