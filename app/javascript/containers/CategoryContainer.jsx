import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewCategoryDetails } from '../actions/portfolios';


class CategoryContainer extends React.Component { 
    categoryProgress(answered, total) {
        if (answered < total) {
          return (<td className='category_status'><span className="dot yellow"></span>Waiting for Handoff</td>);
        }
        return (<td className='category_status'><span className="dot green"></span>Handed Off</td>);
    }

    categoryDelegations() {
        let delegations = this.props.categoryData.delegations;
        let delegationInfo = "";
        for (let i = 0; i < delegations.length; i++) {
            let delegation = delegations[i];
            delegationInfo += delegation.name + " " + delegation.email;
        }
        if (delegationInfo) {
            return delegationInfo;
        } else {
            return (<span>No one assigned yet</span>);
        }
    } 

    onClick() {
        this.props.clickAction(this.props.id, this.props.portfolio_id)
    }

    render() {
        let categoryData = this.props.categoryData;
        let clickAction = this.props.clickAction;
        let id = this.props.id;
        let portfolio_id = this.props.portfolio_id;

        return (
            <tr className='category_data'
                onClick={() => {clickAction(id, portfolio_id)}}>
                <td className='category_name'>{categoryData.name}</td>
                {this.categoryProgress(categoryData.answered, categoryData.total)}
                <td className='delegation_info'>{this.categoryDelegations()}</td>  
            </tr>
        );
    }
}

CategoryContainer.propTypes = {
    portfolio_id: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    categoryData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    clickAction: (categoryId, portfolioId) => {
      dispatch(viewCategoryDetails(categoryId, portfolioId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryContainer);
