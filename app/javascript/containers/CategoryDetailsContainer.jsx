import React from 'react';

import PropTypes from 'prop-types';

class CategoryDetailsContainer extends React.Component {    
    render() {
        return (
            <div className='category_details_container'>
                HELLO THIS IS A CATEGORY DETAILS CONTAINER
                NUMBER {this.props.category_id}
            </div>
        );
    }
}

CategoryDetailsContainer.propTypes = {
    id: PropTypes.string.isRequired,
    building_id: PropTypes.string.isRequired,
    portfolio_id: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired
};

export default CategoryDetailsContainer;
  
