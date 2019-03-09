import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { numAnsweredforCategories } from '../selectors/answersSelector';


class QuestionaireCategoryContainer extends React.Component {
  startOrContinue() {
    if (this.props.is_started) {
      return "Continue"
    }
    return "Start"
  }

  
  render() {
    var categories = this.props.categories;
    var categoryProgress = this.props.categoryProgress;

    return (
      <div className='questionaire-category-container'>
          <br></br>
          {Object.keys(categories).map((id, index) => {
            return (<div key={id}><div className='category-circle'>{index + 1}</div>
              <div><h4>{categories[id].name}</h4>
              <small>{categoryProgress[categories[id].id]} / completed</small></div>
              </div>)
          })}
          <div><div className='category-circle'>{categories.length + 1}</div>
              <div><h4>Delegate</h4></div></div>
          <div><div className='category-circle'>{categories.length + 2}</div>
              <div><h4>Review and Submit</h4></div></div>
      </div>
    );
  }
}

QuestionaireCategoryContainer.propTypes = {
    building_id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    is_started: false
};

function mapStateToProps(state, ownProps) {
    return {
        // dictionary for each category id and its corresponding number of answered questions
        categoryProgress: numAnsweredforCategories(ownProps.building_id, ownProps.categories, state)
        total
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionaireCategoryContainer);
  