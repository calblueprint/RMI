import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';
import OptionsContainer from '../../containers/QuestionnaireForm/OptionsContainer';
import ContentEditable from 'react-sane-contenteditable';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helperInput: !!this.props.question.helper_text,
      unitInput: !!this.props.question.unit,
    };
  }

  componentDidUpdate() {
    if (this.props.select) {
      this.questionInput.focus();
      // this.questionInput.select();
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
   * Handles event for onRemove which is making delete request
   * @param { string } name - the name of the category
   */
  handleOnRemove(name) {
    this.props.handleOnRemove(this.props.question.id, { name })
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { object } args - any attributes of Question to update
   *                          in the form {attr: value}
   */
  onChange(args) {
    // this.questionInput.style.height= `${this.questionInput.scrollHeight}px`;
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
          <div
            className={'question_block_header'}
          >
            <input
              className={'question_block__param'}
              placeholder={"param1"}
              defaultValue={this.props.question.parameter}
              onBlur={(e) => this.handleOnBlur({parameter: e.target.value})}
              onChange={(e) => this.onChange({parameter: e.target.value})}
            />
            <button
              className="btn btn--primary remove_question_btn"
              onClick={(e) => this.handleOnRemove(e.target.value)}>
              x
            </button>
          </div>
          <div
            className={'question_block__body'}
          >
            <div
              className={'question_block__body__main'}
            >
            <ContentEditable
              onChange={() => 0}
              onKeyDown={(e) => this.onChange({ text: e.target.innerText })}
              onBlur={(e) => this.handleOnBlur({ text: e.target.innerText })}
              innerRef={(ref) => this.questionInput = ref}
              tagName="span"
              content={this.props.question.text}
              doNotUpdate={true}
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
  select: PropTypes.bool.isRequired,
  question: PropTypes.object.isRequired,
};
