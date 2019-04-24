import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { questionDataPerCategory, numUnanswered } from '../selectors/answersSelector';
import fontawesome from '@fortawesome/fontawesome';
import delegateIcon from '@fortawesome/fontawesome-free-solid/faUser';
import reviewIcon from '@fortawesome/fontawesome-free-solid/faCheck';


class QuestionaireCategoryContainer extends React.Component {
  categoryProgress(answered, total) {
    if (answered < total) {
      return answered + " / " + total + " ANSWERED";
    }
    return "COMPLETED"
  }

  getFaIcon(icon) {
    return (<i
      style={{ fontSize: '14pt' }}
      dangerouslySetInnerHTML={{
        __html: fontawesome.icon(icon).html[0]
      }}
    />)
  }

  render() {
    var categoryData = this.props.categoryData;    
    return (
      <div className='questionnaire-category-container'>
          <br></br>
          <div className='vertical-bus-map'>
            <div className='vertical-line'></div>
            {Object.keys(categoryData).map((id, index) => {
              return (<div key={id} className='category-circle'>{index + 1}</div>)
            })}
            <div className='category-circle'>{this.getFaIcon(delegateIcon)}</div>
            <div className='category-circle'>{this.getFaIcon(reviewIcon)}</div>
          </div>
          <div className='category-information'>
            {Object.keys(categoryData).map((id) => {
              return (<div key={id} className='with_answer_data'>{categoryData[id].name}<br></br>
                <small>{this.categoryProgress(categoryData[id].answered, categoryData[id].total)}</small>
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
        // array containing an object for each category id, name, number of answered questions, and total questions
        categoryData: questionDataPerCategory(ownProps.building_id, state),
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionaireCategoryContainer);
  