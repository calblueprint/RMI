import React from 'react';
import PropTypes from 'prop-types';
import InputValidation from '../InputValidation';
import { getCurrentCategory } from '../../selectors/categoriesSelector';
import { connect } from 'react-redux';

class CategoryDisplay extends React.Component {
  componentDidMount(prevProps, prevState){
    if (this.props.select) {
      this.categoryInput.focus();
      this.categoryInput.select();
    }
  }

  /**
   * Handles event for onBlur which is making fetch request
   * @param { string } name - the name of the category
   */
  handleOnBlur(name) {
    this.props.handleOnBlur(this.props.category.id, { name })
  }

  /**
   * Handles event for onRemove which is making delete request
   * @param { string } name - the name of the category
   */
  handleOnRemove(name) {
    var confirmDeletion = confirm("Are you sure you want to delete this category (and all dependent questions)?");
    if (confirmDeletion) {
      this.props.handleOnRemove(this.props.category.id, { name })
    }
  }

  /**
   * Handles event for onChange which is updating redux temporarily
   * @param { string } name - the name of the category
   */
  onChange(name) {
    this.props.handleOnChange(this.props.category.id, { name })
  }

  deleteButton() {
    if (!this.props.category["new"]) {
      return (
        <button
          className="btn btn--primary remove_category_btn"
          onClick={(e) => this.handleOnRemove(e.target.value)}>
          Remove Category
        </button>
      )
    } else {
      return (<div></div>)
    }
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
        {this.deleteButton()}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    category: getCurrentCategory(ownProps.category.id, state),
  }
}

export default connect(
  mapStateToProps,
)(CategoryDisplay);

CategoryDisplay.propTypes = {
  category: PropTypes.object.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  errors: PropTypes.array
};
