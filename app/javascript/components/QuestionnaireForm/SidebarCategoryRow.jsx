import React from "react";
import { connect } from "react-redux";
import editIcon from "@fortawesome/fontawesome-free-solid/faEdit";
import checkIcon from "@fortawesome/fontawesome-free-solid/faCheck";
import cancelIcon from "@fortawesome/fontawesome-free-solid/faTimes";
import { patch } from "../../fetch/requester";
import FAIcon from "../FAIcon";
import {
  categoryFetchFailure,
  categoryFetchInProgress,
  categoryFetchSuccess,
  categoryPreFetchSave
} from "../../actions/categories";

class SidebarCategoryRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      currentText: props.category.name
    };
  }

  async updateCategory(updatedCategory) {
    this.props.categoryFetchInProgress(updatedCategory);
    try {
      let response = await patch("/api/categories/" + updatedCategory.id, {
        category: updatedCategory
      });
      this.props.categoryFetchSuccess(response.data);
    } catch (error) {
      this.props.categoryFetchFailure(error, updatedCategory);
    }
  }

  render() {
    const { selected, onSelectCategory, category } = this.props;

    return (
      <div
        key={category.id}
        className={`sidebar-category-row ${
          selected ? "sidebar-category-row-selected" : ""
        }`}
        onClick={e => onSelectCategory(category)}
      >
        {this.state.editing ? (
          <input
            value={this.state.currentText}
            onClick={e => e.stopPropagation()}
            onChange={e => this.setState({ currentText: e.target.value })}
            style={{ fontSize: "10pt" }}
          />
        ) : (
          category.name
        )}
        <div
          className="edit-btn"
          style={{ display: `${this.state.editing ? "inline" : ""}` }}
        >
          {this.state.editing ? (
            <FAIcon
              iconObj={cancelIcon}
              style={{ fontSize: "10pt", marginRight: "5px" }}
              onClick={e => {
                e.stopPropagation();
                this.setState({ editing: false, currentText: category.name });
              }}
            />
          ) : null}
          <FAIcon
            iconObj={this.state.editing ? checkIcon : editIcon}
            style={{
              fontSize: "10pt"
            }}
            onClick={e => {
              e.stopPropagation();
              if (this.state.editing) {
                const updatedCategory = {
                  ...this.props.category,
                  name: this.state.currentText
                };
                this.updateCategory(updatedCategory);
              }
              this.setState(state => ({ editing: !state.editing }));
            }}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    categoryFetchInProgress: category => {
      dispatch(categoryFetchInProgress(category));
    },
    categoryPreFetchSave: category => {
      dispatch(categoryPreFetchSave(category));
    },
    categoryFetchSuccess: category => {
      dispatch(categoryFetchSuccess(category));
    },
    categoryFetchFailure: (error, category) => {
      dispatch(categoryFetchFailure(error, category));
    }
  };
}

export default connect(
  () => ({}),
  mapDispatchToProps
)(SidebarCategoryRow);
