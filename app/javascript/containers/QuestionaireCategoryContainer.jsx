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
    return (
      <div className='questionaire-category-container'>
          <br></br>
          {Object.keys(this.props.categories).map(id => {
            return (<div key={id}><div className='category-circle'>{Number(id) + 1}</div>
              <div><h4>{this.props.categories[id].name}</h4></div>
              </div>)
          })}
          <div><div className='category-circle'>{this.props.categories.length}</div>
              <div><h4>Delegate</h4></div></div>
          <div><div className='category-circle'>{this.props.categories.length + 1}</div>
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
  