import React from 'react';
import InactiveCategoryNode from './InactiveCategoryNode';

import { findIndex } from 'lodash';

class CategoryContainer extends React.Component {
  render() {
    const {currentCategory, categories, remainingQuestions} = this.props;
    const currentBuildingId = this.props.currentBuilding ? this.props.currentBuilding.id : null;
    const currentIndex = !currentCategory ? 0 : findIndex(categories, function (category) {
      return category.id === currentCategory.id;
    });

    console.log(this.props);
    console.log("categories:::");
    console.log(categories);
    console.log("current index - " + currentIndex);

    const finishedCategories = categories.slice(0, currentIndex).map((category, index) => {
      return (<InactiveCategoryNode category={category}
                                    index={index}
                                    buildingId={currentBuildingId}/>);
    });

    const currentlyActive = currentCategory ? (
      <div className="category category--active">
        <div className="category__circle">
          {currentIndex + 1}
        </div>
        <div className="category__info">
          <h1>{currentCategory.name}</h1>
          <h3>{remainingQuestions} questions remaining</h3>
          <p>{currentCategory.description}</p>
        </div>
      </div>
    ) : null;

    const upcomingCategories = categories.slice(currentIndex + 1, categories.length).map((category, index) => {
      return (<InactiveCategoryNode category={category}
                                    index={currentIndex + index + 1}
                                    buildingId={currentBuildingId}/>);
    });

    return (
      <div className="navbar__category-container">
        {finishedCategories}
        {currentlyActive}
        <div className="category__container--inactive">
          {upcomingCategories}
        </div>
      </div>
    )
  }
}

export default CategoryContainer
