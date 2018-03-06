import React from 'react';
import Question from '../../components/QuestionnaireForm/Question';
import DepQuestionContainer from './DepQuestionContainer';
import OptionsContainer from './OptionsContainer'
import {connect} from 'react-redux';

class QuestionContainer extends React.Component {
  //props: question
  render() {
    return (
      <div style={{border: "1px solid black"}}>
        <Question
          question={this.props.question}
        />
        <OptionsContainer
          question={this.props.question}
        />
        <DepQuestionContainer
          question={this.props.question}
          optionsList={Object.keys(this.props.question.options)}
        />
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionContainer);
