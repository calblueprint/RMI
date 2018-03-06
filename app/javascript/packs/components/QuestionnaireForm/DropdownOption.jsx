import React from 'react';
class DropdownOption extends React.Component {
  //props: option, updateOption, handleOnChange

  handleOnBlur(text) {
    this.props.updateOption(this.props.option.id, { text })
  }

  onChange(text) {
    this.props.handleOnChange(this.props.option.id, { text })
  }

  render () {
    return(
      <div>
        <input
          type="text"
          value={this.props.option.text}
          onBlur={(e) => this.handleOnBlur(e.target.value)}
          onChange={(e) => this.onChange(e.target.value)}
        />
      </div>
    )
  }
}

export default DropdownOption
