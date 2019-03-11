import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { questionDataPerCategory, numUnanswered } from '../selectors/answersSelector';


class QuestionaireCategoryContainer extends React.Component {
  render() {
    var categoryData = this.props.categoryData;    
    return (
      <div className='questionaire-category-container'>
          <br></br>
          <div className='vertical-bus-map'>
            <div className='vertical-line'></div>
            {Object.keys(categoryData).map((id, index) => {
              return (<div key={id} className='category-circle'>{index + 1}</div>)
            })}
            <div className='category-circle'>{this.props.categories.length + 1}</div>
            <div className='category-circle'>{this.props.categories.length + 2}</div>
          </div>
          <div className='category-information'>
            {Object.keys(categoryData).map((id, index) => {
              return (<div key={id} className='with_answer_data'>{categoryData[id].name}<br></br>
                <small>{categoryData[id].answered} / {categoryData[id].total} COMPLETED</small>
              </div>)
            })}
            <div>Delegate</div>
            <div>Review and Submit</div>
          </div>
      </div>
    );
  }
}

QuestionaireCategoryContainer.propTypes = {
    building_id: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        // dictionary for each category id and its corresponding number of answered questions
        // categoryProgress: numAnsweredforCategories(ownProps.building_id, ownProps.categories, state),
        // array containing an object for each category id, name, number of answered questions, and total questions
        categoryData: questionDataPerCategory(ownProps.building_id, ownProps.categories, state)
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionaireCategoryContainer);
  