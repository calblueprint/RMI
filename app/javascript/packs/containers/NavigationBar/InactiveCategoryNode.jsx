import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class InactiveCategoryNode extends React.Component {
  render() {
    return (<div className="category category--inactive">
      <Link to={`/buildings/${this.props.buildingId}/edit/${this.props.category.id}`}>
        <div className="category__circle">
          {this.props.index + 1}
        </div>
      </Link>
      <h1>{this.props.category.name}</h1>
    </div>);
  }
}

InactiveCategoryNode.propTypes = {
  category: PropTypes.shape({
    building_type_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  buildingId: PropTypes.number.isRequired
};

export default InactiveCategoryNode;
