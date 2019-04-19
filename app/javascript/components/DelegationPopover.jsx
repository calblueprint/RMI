import React from "react";
import { connect } from "react-redux";
import { Popover, Position } from "@blueprintjs/core";

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
      lastName: ""
    };
  }

  handleContactInfoChange = (key, value) => {
    this.setState({ [key]: value });
  };

  selectContact = () => {
    const { email, firstName, lastName } = this.state;
    this.props.onSelectedContact({ email, firstName, lastName });
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
    if (this.state.email) {
      const query = this.state.email.toLowerCase();
      return this.props.contacts.filter(
        contact =>
          contact.email.toLowerCase().includes(query) ||
          contact.first_name.toLowerCase().includes(query) ||
          contact.last_name.toLowerCase().includes(query)
      );
    } else {
      return this.props.contacts;
    }
  }

  render() {
    return (
      <Popover position={Position.BOTTOM} minimal>
        <button className="delegation__popover-btn">Assign contact</button>
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
      </Popover>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    contacts: getContacts(state)
  };
}

DelegationPopover.defaultProps = {
  toggleSelected: () => 0 /* no-op by default */
};

export default connect(mapStateToProps)(DelegationPopover);
