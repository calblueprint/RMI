import React from 'react';
import Question from '../components/Question';
import { getQuestionsByBuilding } from '../selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BuildingContainer extends React.Component {
  render() {
    return (
      <div>
        <p>Building container!!</p>
        <p>ID: {this.props.match.params.bId}</p>
        <p>Name: {this.props.building.name}</p>
        {this.props.questions.map((question) => {
          return (<Question {...question} />);
        })}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    building: state.buildings[ownProps.match.params.bId],
    questions: getQuestionsByBuilding(ownProps.match.params.bId, state)
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingContainer);

