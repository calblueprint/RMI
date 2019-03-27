import React from 'react';
import PropTypes from 'prop-types';

class InputValidation extends React.Component {
  render() {
    if (this.props.errors) {
      if (this.props.errors instanceof Array) {
        return (
          <div style={{backgroundColor:'red'}}>
            {this.props.errors.map((error) => {
              return(
                <div key={error}>
                  {error}
                </div>
              )
            })}
          </div>
        );
      }
      else {
        return (
          <div style={{backgroundColor:'red'}}>
            {this.props.errors.toString()}
          </div>
        )
      }

    }
    return(
      <div></div>
    )
  }
}

export default InputValidation

InputValidation.propTypes = {
  errors: PropTypes.array
};

