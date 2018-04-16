import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';

class CategoryDisplay extends React.Component {
  componentDidMount(prevProps, prevState){
    if (this.props.select) {
      this.categoryInput.focus();
      this.categoryInput.select();
    }
  }
  //props: option, updateOption, handleOnChange

  /**
   * Handles event for onBlur which is making fetch request
   * @param { string } name - the name of the category
   */
  handleOnBlur(name) {
    this.props.handleOnBlur(this.props.category.id, { name })
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } name - the name of the category
   */
  onChange(name) {
    this.props.handleOnChange(this.props.category.id, { name })
  }

  render () {
    return(
      <div>
        <input
          type="text"
          defaultValue={this.props.category.name}
          onBlur={(e) => this.handleOnBlur(e.target.value)}
          onChange={(e) => this.onChange(e.target.value)}
          style={{fontSize: '20px'}}
          ref={(input) => {this.categoryInput = input;}}
        />
        <div>
          <InputValidation
            errors={this.props.category.error}
          />
        </div>
      </div>
    )
  }
}

export default CategoryDisplay

CategoryDisplay.propTypes = {
  category: PropTypes.object.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  errors: PropTypes.array
};
