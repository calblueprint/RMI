import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { numAnsweredforCategories, questionDataPerCategory } from '../selectors/answersSelector';


class QuestionaireCategoryContainer extends React.Component {
  startOrContinue() {
    if (this.props.is_started) {
      return "Continue"
    }
    return "Start"
  }

  
  render() {
    var categoryData = this.props.categoryData;

    return (
      <div className='questionaire-category-container'>
          <br></br>
          {/* {Object.keys(categoryData).map((id, index) => {
            return (<div key={id}><div className='category-circle'>{index + 1}</div>
              <div><h4>{categoryData[id].name}</h4>
              <small>{categoryData[id].answered} / {categoryData[id].total} completed</small></div>
              </div>)
          })}
          <div><div className='category-circle'>{categories.length + 1}</div>
              <div><h4>Delegate</h4></div></div>
          <div><div className='category-circle'>{categories.length + 2}</div>
              <div><h4>Review and Submit</h4></div></div> */}

          <div className='vertical-bus-map'>
            {Object.keys(categoryData).map((id, index) => {
              return (<div key={id} className='category-circle'>{index + 1}</div>)
            })}
            <div className='category-circle'>{categoryData.length + 1}</div>
            <div className='category-circle'>{categoryData.length + 2}</div>
          </div>
          <div className='category-information'>
            {Object.keys(categoryData).map((id, index) => {
              return (<div key={id}>{categoryData[id].name}<br></br>
                <small>{categoryData[id].answered} / {categoryData[id].total} completed</small>
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
  