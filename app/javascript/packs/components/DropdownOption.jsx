import React from 'react';

class DropdownOption extends React.Component {
  componentDidMount() {
    if (this.props.answer) {
      const selected_option_id = this.props.answer.selected_option_id;
      if (selected_option_id) {
        this.saveAnswer(selected_option_id, this.props.answer.text);
      }
    }

    if (this.props.setFocusFunc) {
      this.props.setFocusFunc(() => this.ref.focus());
    }
  }

  onChange(optionId) {
    this.saveAnswer(optionId, this.props.options[optionId].text);
  }

  saveAnswer(optionId, text) {
    this.props.onChange(optionId, text);
    this.props.onSave(optionId, text);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.selected_option_id : "unselected";
    return (<div>
      <select
        value={currentValue}
        onChange={(e) => this.onChange(e.target.value)}
        onFocus={(e) => this.props.onEnter()}
        onBlur={(e) => this.props.onLeave()}
        ref={(ref) => this.ref = ref}
      >
        <option value="unselected" disabled>Select an option</option>
        {Object.values(this.props.options).map((option) => {
          return (<option value={option.id} key={option.id}>{option.text}</option>)
        })}
      </select>
    </div>);
  }
}

export default DropdownOption;
