import React from 'react';

class DropdownOption extends React.Component {
  componentDidMount() {
    if (this.props.answer) {
      const selected_option_id = this.props.answer.selected_option_id;
      if (selected_option_id) {
        this.props.onChange(selected_option_id, this.props.answer.text);
      }
    }
  }

  onChange(optionId) {
    this.props.onChange(optionId, this.props.options[optionId].text);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.selected_option_id : "unselected";
    return (<div>
      <select onChange={(e) => this.onChange(e.target.value)}
              value={currentValue}>
        <option value="unselected" disabled>Select an option</option>
        {Object.values(this.props.options).map((option) => {
          return (<option value={option.id} key={option.id}>{option.text}</option>)
        })}
      </select>
    </div>)
  }
}

export default DropdownOption;
