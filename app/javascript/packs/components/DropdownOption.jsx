import React from 'react';

class DropdownOption extends React.Component {
  componentDidMount() {
    if (this.props.answer) {
      const selected_option_id = this.props.answer.selected_option_id;
      if (selected_option_id) {
        this.props.onSelect(selected_option_id, this.props.answer.text);
      }
    }
  }

  handleChange(e) {
    const optionId = e.target.value;
    this.props.onSelect(optionId, this.props.options[optionId].text);
  }

  render() {
    const currentValue = this.props.answer ? this.props.answer.selected_option_id : "unselected";
    return (<div>
      <select onChange={(e) => this.handleChange(e)}
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
