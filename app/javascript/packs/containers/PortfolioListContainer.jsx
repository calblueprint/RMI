import React from 'react';

import { loadInitialState } from '../actions/initialState';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PortfolioListContainer extends React.Component {
  componentDidMount() {
    if (window.INITIAL_STATE) {
      this.props.initActions.loadInitialState(window.INITIAL_STATE);
    }
  }

  render() {
    const portfolios = this.props.portfolios;
    return (<div>
      <h2>Portfolios</h2>
      {Object.keys(portfolios).map(id => {
        return (<p key={id}>{portfolios[id].name} |
          <Link to={`/portfolios/${id}`}>Details</Link>
        </p>)
      })}
    </div>);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    portfolios: state.portfolios
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initActions: bindActionCreators({ loadInitialState }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortfolioListContainer);

