import React from 'react';

class DropdownOption extends React.Component {
  componentDidMount() {
    const selected_option_id = this.props.answer.selected_option_id;
    if (selected_option_id) {
      this.props.onSelect(selected_option_id);
    }
  }

  render() {
    return (<div>
      <select onChange={(e) => this.props.onSelect([e.target.value])}
              defaultValue={this.props.answer.selected_option_id || "unselected"}>
        <option value="unselected" disabled>Select an option</option>
        {Object.values(this.props.options).map((option) => {
          return (<option value={option.id} key={option.id}>{option.text}</option>)
        })}
      </select>
    </div>)
  }
}

export default DropdownOption;