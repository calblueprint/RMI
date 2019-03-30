import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { questionDataPerCategory } from '../selectors/answersSelector';


class PortfolioBuildingCategoryContainer extends React.Component {
  categoryProgress(answered, total) {
    if (answered < total) {
      return answered + " / " + total + " ANSWERED";
    }
    return "COMPLETED"
  }

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
          </div>
          <div className='category-information'>
            {Object.keys(categoryData).map((id) => {
              return (<div key={id} className='with_answer_data'>{categoryData[id].name}<br></br>
                <small>{this.categoryProgress(categoryData[id].answered, categoryData[id].total)}</small>
              </div>)
            })}
          </div>
      </div>
    );
  }
}

PortfolioBuildingCategoryContainer.propTypes = {
    building_id: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
};

function mapStateToProps(state, ownProps) {
    return {
        // array containing an object for each category id, name, number of answered questions, and total questions
        categoryData: questionDataPerCategory(ownProps.building_id, ownProps.categories, state),
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {};
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PortfolioBuildingCategoryContainer);
  