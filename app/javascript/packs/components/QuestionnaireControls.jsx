/**
 * Displays controls allowing the user to navigate between modes and choose question categories to filter.
 * All this does is modify the current URL, and BuildingContainer will take care of the rest.
 */

import React from 'react';

import { Link } from 'react-router-dom';

class QuestionnaireNavigation extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Link to={`${this.props.currentPath}/edit`}>Edit Mode</Link>
        </div>
        <div>
          <Link to={`${this.props.currentPath}/delegate`}>Delegate Mode</Link>
        </div>
        <div>
          <Link to={`${this.props.currentPath}/review`}>Review Mode</Link>
        </div>
      </div>
    );
  }
}

export default QuestionnaireNavigation;
