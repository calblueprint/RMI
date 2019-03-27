import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class InactiveCategoryNode extends React.Component {
  needDisableStyle() {
    if (this.props.isDisabled) {
      return {"pointer-events": "none", "filter": "brightness(115%)"};
    } 
  }

  needDisableText() {
    if (this.props.isDisabled) {
      return {"filter": "brightness(160%)"};
    } 
  }
  

  render() {
    return (<div className="category category--inactive">
      <Link to={this.props.path} style={this.needDisableStyle()}  >
        <div className="category__circle">
          {this.props.label}
        </div>
      </Link>
      <h1 style={this.needDisableText()}>{this.props.name}</h1>
    </div>);
  }
}

InactiveCategoryNode.propTypes = {
  label: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default InactiveCategoryNode;
