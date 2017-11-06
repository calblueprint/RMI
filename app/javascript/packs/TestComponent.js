import React from 'react';
import * as QuestionActions from './actions/questions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  onChange(e, key) {
    this.setState({
      [key]: e.target.value
    });
  }

  render() {
    return (<div>
      <input
        type="text"
        onChange={(e) => this.onChange(e, 'text')}
        value={this.state.text}
      />
      <button
        onClick={(e) => this.props.actions.addQuestion(this.state.text)}
      >
        Add question
      </button>
    </div>);
  }


}

function mapStateToProps(state) {
  return {
    questions: state.questions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(QuestionActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestComponent);
