import React from 'react';
import { connect } from "react-redux";

import PropTypes from 'prop-types';

class CategoryContainer extends React.Component { 
    categoryProgress(answered, total) {
        if (answered < total) {
          return answered + " / " + total + " ANSWERED";
        }
        return "COMPLETED"
    }

    categoryDelegations() {
        let delegations = this.props.categoryData.delegations;
        let delegationInfo = "";
        for (let i = 0; i < delegations.length; i++) {
            let delegation = delegations[i];
            delegationInfo += delegation.name + " " + delegation.email;
        }
        return delegationInfo;
    }
        
    render() {
        let categoryData = this.props.categoryData

        return (<div className='category_data'>
                    <div>{categoryData.name}<br></br>
                        <small>{this.categoryProgress(categoryData.answered, categoryData.total)}</small>
                    </div>
                    <div class='delegation_info'>
                        {this.categoryDelegations()}
                    </div>
                </div>);
    }
}

CategoryContainer.propTypes = {
    id: PropTypes.string.isRequired,
    categoryData: PropTypes.object.isRequired,
};

export default CategoryContainer;
  
