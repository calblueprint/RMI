import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setActiveCategory } from "../actions/portfolios";
import { getSelectedCategoryId } from "../selectors/portfoliosSelector";

/** Renders the name, status, and a list of delegations for a specific category
 * child of the PortfolioBuildingInfoContainer
 */
class CategoryContainer extends React.Component {
  categoryProgress(answered, total) {
    if (answered < total) {
      return (
        <td className="category_status">
          <span className="dot yellow" />
          Waiting for Handoff
        </td>
      );
    }
    return (
      <td className="category_status">
        <span className="dot green" />
        Handed Off
      </td>
    );
  }

  categoryDelegations() {
    const [
      firstDelegation,
      secondDelegation,
      ...otherDelegations
    ] = this.props.categoryData.delegations;
    switch (this.props.categoryData.delegations.length) {
      case 0:
        return <span>No one assigned yet</span>;
      case 1:
        return firstDelegation.building_operator.email;
      case 2:
        return `${firstDelegation.building_operator.email} and ${
          secondDelegation.building_operator.email
        }`;
      default:
        return `${firstDelegation.building_operator.email}, ${
          secondDelegation.building_operator.email
        }, and ${otherDelegations.length} others`;
    }
  }

  isActive(categoryId) {
    if (this.props.selectedCategoryId == categoryId) {
      return "active";
    }
  }

  render() {
    let { categoryData, setActiveCategory, id, portfolioId } = this.props;

    return (
      <tr
        className="category_data"
        onClick={() => {
          setActiveCategory(id, portfolioId);
        }}
        className={this.isActive(categoryData.id)}
      >
        <td className="category_name">{categoryData.name}</td>
        {this.categoryProgress(categoryData.answered, categoryData.total)}
        <td className="delegation_info">{this.categoryDelegations()}</td>
      </tr>
    );
  }
}

CategoryContainer.propTypes = {
  portfolioId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  categoryData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    selectedCategoryId: getSelectedCategoryId(ownProps.portfolioId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveCategory: (categoryId, portfolioId) => {
      dispatch(setActiveCategory(categoryId, portfolioId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryContainer);
