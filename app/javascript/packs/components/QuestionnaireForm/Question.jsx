import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';
import OptionsContainer from '../../containers/QuestionnaireForm/OptionsContainer';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helperInput: !!this.props.question.helper_text,
      unitInput: !!this.props.question.unit,
    };
  }

  componentDidMount(){
    if (this.props.focus) {
      this.questionInput.focus();
    }
  }

  /**
   * Handles event for onBlur which is making fetch request
   * @param { object } args - any attributes of Question to update
   *                          in the form {attr: value}
   */
  handleOnBlur(args) {
    this.props.handleOnBlur(this.props.question.id, args)
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { object } args - any attributes of Question to update
   *                          in the form {attr: value}
   */
  onChange(args) {
    this.questionInput.style.height= `${this.questionInput.scrollHeight}px`;
    this.props.handleOnChange(this.props.question.id, args)
  }

  addButton(addText, state) {
    return (
      <button
        onClick={ (e) => this.setState({...this.state, ...state}) }
      >
        {addText}
      </button>
    )
  }

  displayUnit() {
    const rangeUnitButton = this.addButton("Add unit", {unitInput: true});
    const rangeUnit = (
      <input
        defaultValue={this.props.question.unit}
        onBlur={(e) => this.handleOnBlur({unit: e.target.value})}
        onChange={(e) => this.onChange({unit: e.target.value})}
        placeholder={"Feet"}
      />
    );

    if (this.props.question.question_type === 'RangeOption') {
      return (this.state.unitInput? rangeUnit : rangeUnitButton)
    }
  }

  render() {
    const helperTextButton = this.addButton("+ Add Helper Text", {helperInput: true});

    const helperTextInput = (
      <textarea
        placeholder={"Add supplemental information for this question"}
        defaultValue={this.props.question.helper_text}
        onBlur={(e) => this.handleOnBlur({helper_text: e.target.value})}
        onChange={(e) => this.onChange({helper_text: e.target.value})}
      />
    );

    return (
      <div

      >
        <div
          className={'question_block'}
        >
          <input
            className={'question_block__param'}
            placeholder={"param1"}
            defaultValue={this.props.question.parameter}
            onBlur={(e) => this.handleOnBlur({parameter: e.target.value})}
            onChange={(e) => this.onChange({parameter: e.target.value})}
          />
          <div
            className={'question_block__body'}
          >
            <div
              className={'question_block__body__main'}
            >
            <textarea
              defaultValue={this.props.question.text}
              onBlur={(e) => this.handleOnBlur({text: e.target.value})}
              onChange={(e) => this.onChange({text: e.target.value})}
              ref={(input) => { this.questionInput = input;
              }}
            />
              <div>
                <OptionsContainer
                  question={this.props.question}
                />
              </div>
            </div>
            <div
              className={'question_block__body__support'}
            >
              { this.state.helperInput? helperTextInput : helperTextButton }
              {this.displayUnit()}
            </div>
          </div>
        </div>

        <div>
          <InputValidation
            errors={this.props.question.error}
          />
        </div>
      </div>
    );
  }
};

export default Question

Question.propTypes = {
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
};
