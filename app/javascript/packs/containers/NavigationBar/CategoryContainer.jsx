import React from 'react';
import BusMap from './BusMap';

import { findIndex } from 'lodash';

import fontawesome from '@fortawesome/fontawesome';
import delegateIcon from '@fortawesome/fontawesome-free-solid/faUser';
import reviewIcon from '@fortawesome/fontawesome-free-solid/faCheck';

class CategoryContainer extends React.Component {
  getFaIcon(icon) {
    return (<i
      style={{ fontSize: '14pt' }}
      dangerouslySetInnerHTML={{
        __html: fontawesome.icon(icon).html[0]
      }}
    />)
  }

  render() {
    const {currentCategory, categories, remainingQuestions} = this.props;
    const currentBuildingId = this.props.currentBuilding ? this.props.currentBuilding.id : null;
    const currentIndex = !currentCategory ? categories.length : findIndex(categories, function (category) {
      return category.id === currentCategory.id;
    });

    // Create info objects for each category to pass to the BusMap component
    const categoryInfo = categories.map((category, index) => {
      return {
        label: index + 1,
        path: `/buildings/${currentBuildingId}/edit/${category.id}`,
        name: category.name
      }
    });
    const finishedCategories = categoryInfo.slice(0, currentIndex);
    const upcomingCategories = categoryInfo.slice(currentIndex + 1, categories.length);

    // Icons for delegate and review mode (which aren't actual categories)
    const delegateInfo = {
      label: this.getFaIcon(delegateIcon),
      path: `/buildings/${currentBuildingId}/delegate`,
      name: "Handoff",
      subtitle: "Assign remaining questions to other users"
    };
    const reviewInfo = {
      label: this.getFaIcon(reviewIcon),
      path: `/buildings/${currentBuildingId}/review`,
      name: "Review and Submit",
      subtitle: "Final step!"
    };

    // Figure out what the current icon should be.
    // (Either a category, or delegate/review mode)
    const current = (() => {
      if (currentIndex === categories.length) {
        if (this.props.currentMode === "delegate") {
          upcomingCategories.push(reviewInfo);
          return delegateInfo;
        }
        else if (this.props.currentMode === "review") {
          finishedCategories.push(delegateInfo);
          return reviewInfo;
        }
      }
      else {
        upcomingCategories.push(delegateInfo);
        upcomingCategories.push(reviewInfo);

        return {
          label: currentIndex + 1,
          path: `/buildings/${currentBuildingId}/edit/${currentCategory.id}`,
          name: currentCategory.name,
          subtitle: remainingQuestions + " questions remaining"
        }
      }
    })();

    return (
      <BusMap completed={finishedCategories}
              current={current}
              upcoming={upcomingCategories}/>
    );
  }
}

export default CategoryContainer;
