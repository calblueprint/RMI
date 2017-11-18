import React from 'react';

class DropdownOption extends React.Component {
  render() {
    return (<div>
      <select defaultValue="unselected">
        <option value="unselected" disabled>Select an option</option>
        {this.props.options.map((option) => {
          return (<option value={option.id} key={option.id}>{option.text}</option>)
        })}
      </select>
    </div>)
  }
}

export default DropdownOption;
