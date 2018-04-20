import React from 'react';
import { connect } from 'react-redux';
import { getCategoryByBuildingTypeId } from '../../selectors/categoriesSelector';
import { getBuildingType } from '../../selectors/buildingTypesSelector';
import PropTypes from 'prop-types';
import CategoryQuestionsContainer from './CategoryQuestionsContainer';
import {generateTempId} from '../../utils/TemporaryObjectUtil';
import {patch, post} from '../../fetch/requester';
import {
  categoryFetchFailure, categoryFetchInProgress, categoryFetchSuccess, categoryPreFetchSave,
  removeCategory,categorySetNew
} from '../../actions/categories';

import CategoryDisplay from '../../components/QuestionnaireForm/CategoryDisplay';

class QuestionnaireFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: this.props.categoryList[0],
      select: false
    };
  }

  toggleCategory(category) {
    this.setState({currentCategory: category})
  }

  onNewCategory() {
    const newCategory = {
      id: generateTempId(),
      name: "Untitled",
      building_type_id: this.props.buildingType.id,
    };
    this.createCategory(newCategory)
  }

  /**
   * Handles fetch request to post a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async createCategory(newCategory) {
    try {
      let response = await post('/api/categories', {'category': newCategory});
      this.props.categoryFetchSuccess(response.data);
      this.props.categorySetNew(response.data.id);
      this.setState({currentCategory: response.data})
    } catch (error) {
      this.props.categoryFetchFailure(error, newCategory);
    }
  }

  render() {
    const categoryToggle = this.props.categoryList.map((category) => {
      const currentColor = category.id == this.state.currentCategory.id ? 'red' : 'transparent';
      return(
        <div
          key={category.id}
        >
          <button
            onClick={(e) => this.toggleCategory(category)}
            style={{backgroundColor: currentColor}}
          >
            {category.name}
          </button>
        </div>
      )
    });

    return (
      <div>
        <div>
          {categoryToggle}
          <button
            onClick={(e) => this.onNewCategory()}
          >
            New Category
          </button>
        </div>
        <CategoryQuestionsContainer
          buildingType={this.props.buildingType}
          categoryId={this.state.currentCategory.id}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categoryList: getCategoryByBuildingTypeId(ownProps.match.params.id, state),
    buildingType: getBuildingType(ownProps.match.params.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryFetchInProgress: (category) => { dispatch(categoryFetchInProgress(category)) },
    categoryPreFetchSave: (category) => { dispatch(categoryPreFetchSave(category)) },
    categoryFetchSuccess: (category) => {dispatch(categoryFetchSuccess(category))},
    categoryFetchFailure: (error, category) => { dispatch(categoryFetchFailure(error, category)) },
    removeCategory: (category) => { dispatch(removeCategory(category))},
    categorySetNew: (categoryId) => { dispatch(categorySetNew(categoryId))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireFormContainer);

QuestionnaireFormContainer.propTypes = {
  categoryList: PropTypes.array.isRequired,
  buildingType: PropTypes.object.isRequired
};
