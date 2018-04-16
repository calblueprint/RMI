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
  removeCategory
} from '../../actions/categories';

import CategoryDisplay from '../../components/QuestionnaireForm/CategoryDisplay';

class QuestionnaireFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategory: this.props.categories[0],
      select: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.setState({currentCategory: categories })
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
      this.setState({currentCategory: response.data, select:true})
    } catch (error) {
      this.props.categoryFetchFailure(error, newCategory);
    }
  }

  /**
   * Handles fetch request to update a question and redux update
   * @param { string } id - questionId to update
   * @param { Object } args - any question parameters
   */
  async updateCategory(id, args) {
    const updatedCategory = {...this.state.currentCategory, ...args};
    this.props.categoryFetchInProgress(updatedCategory);
    try {
      let response = await patch('/api/categories/' + updatedCategory.id, {'category': updatedCategory});
      this.props.categoryFetchSuccess(response.data);
    } catch (error) {
      this.props.categoryFetchFailure(error, updatedCategory);
    }
  }

  /**
   * Calls async fetch function during onBlur to create or update question object.
   * @param {string} id - questionId to update
   * @param {object} args - any question parameters
   */
  handleOnBlur(id, args) {
    this.updateCategory(id, args)
  }

  /**
   * Handles event for onChange which is updating redux temporarily.
   * If create new question, create a temp question in question store.
   * @param { string } id - questionId that is updating
   * @param { string } args - any question parameters
   */
  handleOnChange(id, args) {
    const updatedCategory = {...this.state.currentCategory, ...args};
    this.props.categoryPreFetchSave(updatedCategory)
  }

  render() {
    const categoryToggle = Object.keys(this.props.categories).map((categoryId) => {
      const category = this.props.categories[categoryId];
      return(
        <div
          key={categoryId}
        >
          <button
            onClick={(e) => this.toggleCategory(category)}
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
        <div>
          <CategoryDisplay
            category={this.state.currentCategory}
            errors={this.state.currentCategory.error}
            select={this.props.select}
            handleOnBlur={this.handleOnBlur.bind(this)}
            handleOnChange={this.handleOnChange.bind(this)}
            key={this.state.currentCategory.id}
          />
        </div>
        <CategoryQuestionsContainer
          buildingType={this.props.buildingType}
          category={this.state.currentCategory}
          select={this.state.select}
        />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: getCategoryByBuildingTypeId(ownProps.match.params.id, state),
    buildingType: getBuildingType(ownProps.match.params.id, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    categoryFetchInProgress: (category) => { dispatch(categoryFetchInProgress(category)) },
    categoryPreFetchSave: (category) => { dispatch(categoryPreFetchSave(category)) },
    categoryFetchSuccess: (category) => {dispatch(categoryFetchSuccess(category))},
    categoryFetchFailure: (error, category) => { dispatch(categoryFetchFailure(error, category)) },
    removeCategory: (category) => { dispatch(removeCategory(category))}
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionnaireFormContainer);

QuestionnaireFormContainer.propTypes = {
  categories: PropTypes.array.isRequired,
  buildingType: PropTypes.object.isRequired
};
