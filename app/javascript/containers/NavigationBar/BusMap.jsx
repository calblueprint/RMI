import React from "react";
import PropTypes from "prop-types";
import InactiveCategoryNode from "./InactiveCategoryNode";
import { connect } from "react-redux";
import { getNumUnansweredForBuilding } from "../../selectors/answersSelector";

/**
 * A "bus map" style component for the navbar that shows progression through the questionnaire
 * with buttons for each category, as well as delegate/review stages.
 */
class BusMap extends React.Component {
  isDisabledHelper(categoryInfo) {
    return (
      this.props.numUnanswered > 0 && categoryInfo.name === "Review and Submit"
    );
  }

  render() {
    const completed = this.props.completed.map(categoryInfo => {
      return (
        <InactiveCategoryNode
          key={categoryInfo.path}
          label={categoryInfo.label}
          path={categoryInfo.path}
          name={categoryInfo.name}
          isDisabled={false}
        />
      );
    });

    const currentlyActive = this.props.current ? (
      <div className="category category--active">
        <div className="category__circle">{this.props.current.label}</div>
        <div className="category__info">
          <h1>{this.props.current.name}</h1>
          <h3>{this.props.current.subtitle}</h3>
          <p>{this.props.current.description}</p>
        </div>
      </div>
    ) : null;

    const upcoming = this.props.upcoming.map(categoryInfo => {
      return (
        <InactiveCategoryNode
          key={categoryInfo.path}
          label={categoryInfo.label}
          path={categoryInfo.path}
          name={categoryInfo.name}
          isDisabled={this.isDisabledHelper(categoryInfo)}
        />
      );
    });

    return (
      <div className="navbar__category-container">
        {completed}
        {currentlyActive}
        <div className="category__container--inactive">{upcoming}</div>
      </div>
    );
  }
}

BusMap.propTypes = {
  // Info about the current category.
  current: PropTypes.shape({
    label: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string
    ]).isRequired, // Value or icon to display
    path: PropTypes.string.isRequired, // Path to link to
    name: PropTypes.string.isRequired, // Name of category
    subtitle: PropTypes.string.isRequired, // Additional info (e.g. "__ questions remaining")
    description: PropTypes.string // Helper text (explain what category is about)
  }).isRequired,

  // List of already completed category objects. Each object should have label, path, and name
  completed: PropTypes.array.isRequired,

  // List of upcoming categories. Each object should have label, path, and name
  upcoming: PropTypes.array.isRequired,

  buildingId: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // number of undelegated questions, used to decide when to disable navigation in delegate mode
    numUnanswered: getNumUnansweredForBuilding(ownProps.buildingId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusMap);
