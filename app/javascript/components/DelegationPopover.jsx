import React from "react";
import { connect } from "react-redux";
import { Popover, Position } from "@blueprintjs/core";

import { addContact } from "../actions/contacts";
import { getContacts } from "../selectors/contactsSelector";
import DelegationNameInputs from "../components/DelegationNameInputs";
import DelegationContactDropdown from "../components/DelegationContactDropdown";

class DelegationPopover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      showNameInputs: false,
      email: "",
      firstName: "",
      lastName: "",
    };
  }

  handleContactInfoChange = (key, value) => {
    this.setState({ [key]: value });
  };

  selectContact = () => {
    const { email, firstName, lastName } = this.state;
    const lowercaseEmail = email.toLowerCase();
    this.setState({ popoverOpen: false }, () => {
      this.setState({ email: "" });
      this.props.onSelectedContact({email: lowercaseEmail, firstName, lastName})
      this.props.addContact(firstName, lastName, lowercaseEmail);
    });
  };

  selectContactByEmail = email => {
    const contact = this.props.contacts.find(
      contact => contact.email === email
    );
    if (!contact) {
      return;
    }
    this.setState(
      {
        email,
        firstName: contact.first_name,
        lastName: contact.last_name
      },
      this.selectContact
    );
  };

  filterContacts() {
    if (this.state.email && this.state.popoverOpen) {
      const query = this.state.email.toLowerCase();
      return this.props.contacts.filter(
        contact => {
          return (contact.email && contact.email.toLowerCase().includes(query)) ||
          (contact.first_name && contact.first_name.toLowerCase().includes(query)) ||
          (contact.last_name && contact.last_name.toLowerCase().includes(query))
        }
          
      );
    } else {
      return this.props.contacts;
    }
  }

  styleIfDisabled() {
    if (this.props.disabled) {
      return {"background-color": "#B2B2B2"}
    }
  }

  render() {
    return (
      <Popover
        position={Position.BOTTOM_LEFT}
        isOpen={this.state.popoverOpen}
        onInteraction={nextState => {
          this.setState({ popoverOpen: nextState });
        }}
        onClose={() => this.setState({ showNameInputs: false })}
        minimal
        disabled={this.props.disabled}
      >
        <button className="delegation__popover-btn" style={this.styleIfDisabled()}>{this.props.label}</button>
        <div className="delegation__popover-content">
          {this.state.showNameInputs ? (
            <DelegationNameInputs
              handleContactInfoChange={this.handleContactInfoChange}
              handleClickSaveContact={this.selectContact}
            />
          ) : (
            <DelegationContactDropdown
              handleClickCreateContact={() =>
                this.setState({ showNameInputs: true })
              }
              handleContactInfoChange={this.handleContactInfoChange}
              handleExistingContactSelect={this.selectContactByEmail}
              toggleSelected={this.props.toggleSelected}
              contacts={Object.values(this.filterContacts())}
              email={this.state.email}
            />
          )}
        </div>
      </Popover>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    contacts: getContacts(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addContact: (firsName, lastName, email) => {
      dispatch(addContact(email, firsName, lastName))
    }
  }
}

DelegationPopover.defaultProps = {
  toggleSelected: () => 0 /* no-op by default */,
  label: "Assign Contact"
};

export default connect(mapStateToProps, mapDispatchToProps)(DelegationPopover);
