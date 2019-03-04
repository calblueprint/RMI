import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { numAnsweredforCategories } from '../selectors/answersSelector';


class QuestionaireCategoryContainer extends React.Component {
    displayCategories() {
        let categoryNames = this.props.categories[0].name;
        for (let i = 1; i < this.props.categories.length; i++ ) {
            categoryNames += ", " + this.props.categories[i].name;
        }
        return categoryNames
    }

  render() {
    return (
      <div>
          {this.displayCategories()}
          <br></br>

      </div>
    );
  }
}

QuestionaireCategoryContainer.propTypes = {
    building_id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        //TODO: currently puts 0 for every number of answered question
        // dictionary for each category id and its corresponding number of answered questions
        categoryProgress: numAnsweredforCategories(ownProps.building_id, ownProps.categories, state)
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionaireCategoryContainer);
  