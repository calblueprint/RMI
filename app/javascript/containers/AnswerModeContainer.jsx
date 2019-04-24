/**
 * The default mode that allows the user to answer questions about a building.
 * ROUTE - /buildings/:bId/edit
 */

import React from "react";
import PropTypes from "prop-types";
import QuestionContainer from "./QuestionContainer";

import { connect } from "react-redux";
import { getQuestionsByBuilding } from "../selectors/questionsSelector";
import { getQuestionsByCategory } from "../utils/QuestionsFilter";
import { getCategoriesForBuilding } from "../selectors/categoriesSelector";
import { Link } from "react-router-dom";

class AnswerModeContainer extends React.Component {
  findNextPage() {
    let nextPageURL = "/buildings/" + String(this.props.building.id);
    for (let i = 0; i < this.props.categories.length - 1; i++) {
      if (this.props.categories[i].id == this.props.match.params.cId) {
        nextPageURL += "/edit/" + this.props.categories[i + 1].id;
        return [nextPageURL, this.props.categories[i + 1].name];
      }
    }
    return [nextPageURL + "/delegate", "Handoff"];
  }

  render() {
    const [next_path, next_category_name] = this.findNextPage();
    return (
      <div className="question__container">
        {this.props.questions.map(question => {
          // Only display non-dependent questions initially
          if (question.parent_option_id) return null;
          return (
            <QuestionContainer
              mode="answer"
              key={question.id}
              building_id={this.props.building.id}
              {...question}
            />
          );
        })}
        <Link className="next-button" to={next_path}>
          <b>Next:</b> {next_category_name}
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    questions: getQuestionsByCategory(
      ownProps.match.params.cId,
      getQuestionsByBuilding(ownProps.building.id, state)
    ),
    categories: getCategoriesForBuilding(ownProps.building.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

AnswerModeContainer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired, // TODO: Question Flow type
  building: PropTypes.object.isRequired // TODO: Building Flow type
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerModeContainer);
