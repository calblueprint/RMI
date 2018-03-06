import React from 'react';
class RangeOption extends React.Component {

  checkMin(rawNum) {
    const num = parseInt(rawNum);
    if (num && num < this.props.option.max) {
      //trigger fetch function
      this.props.updateOption(this.props.option.id, {min: num});
    }
  }

  checkMax (rawNum) {
    const num = parseInt(rawNum);
    if (num && num > this.props.options.min) {
      //trigger fetch function
      this.props.updateOption(this.props.option.id, {max: num})
    }
  }

  tempUpdateMin (rawNum) {
    const num = parseInt(rawNum);
    this.props.handleOnChange(this.props.option.id, {min: num})
  }

  tempUpdateMax (rawNum) {
    const num = parseInt(rawNum);
    this.props.handleOnChange(this.props.option.id, {max: num})
  }


  render() {
    return(
      <div>
        min:
        <input
          type="number"
          defaultValue={this.props.option.min}
          onBlur={(e) => this.checkMin(e.target.value)}
          onChange={(e) => this.tempUpdateMin(e.target.value)}
        />
        max:
        <input
          type="number"
          defaultValue={this.props.option.max}
          onBlur={(e) => this.checkMax(e.target.value)}
          onChange={(e) => this.tempUpdateMax(e.target.value)}
        />
      </div>
    );
  }

}

export default RangeOption
