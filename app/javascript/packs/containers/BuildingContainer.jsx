import React from 'react';

import Question from '../components/Question';
import { getQuestionsByBuilding } from '../selectors/questionsSelector';
import * as ViewContextActions from '../actions/viewContext';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BuildingContainer extends React.Component {
  componentDidMount() {
    this.props.viewContextActions.setQuestionnaireEditMode();
  }

  render() {
    return (
      <div>
        <p>Building container!!</p>
        <p>ID: {this.props.match.params.bId}</p>
        <p>Name: {this.props.building.name}</p>
        <hr />
        {this.props.questions.map((question) => {
          // Only display non-dependent questions initially
          if (!question.parent_option_id) {
            return (<Question key={question.id}
                              building_id={this.props.building.id}
                              {...question} />);
          }
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
  return {
    viewContextActions: bindActionCreators(ViewContextActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingContainer);

