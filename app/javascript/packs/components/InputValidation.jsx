import React from 'react';
import PropTypes from 'prop-types';

class InputValidation extends React.Component {
  render() {
    if (this.props.errors) {
      const errors = this.props.errors.map((error) => {
        return(
          <div key={error}>
            {error}
          </div>
        )
      });
      return(
        <div style={{backgroundColor:'red'}}>
          {errors}
        </div>
      )
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

