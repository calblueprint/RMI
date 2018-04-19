import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class InactiveCategoryNode extends React.Component {
  render() {
    return (<div className="category category--inactive">
      <Link to={this.props.path}>
        <div className="category__circle">
          {this.props.label}
        </div>
      </Link>
      <h1>{this.props.name}</h1>
    </div>);
  }
}

InactiveCategoryNode.propTypes = {
  label: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default InactiveCategoryNode;
