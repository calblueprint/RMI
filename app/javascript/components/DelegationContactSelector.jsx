import React from "react";
import { MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";

import validateEmail from "../utils/validateEmail";

function DelegationContactSelector({
  email,
  handleClickCreateContact,
  handleContactInfoChange,
  handleExistingContactSelect,
  handleDelegationCancel,
  toggleSelected,
  contacts
}) {
  let noResultsFallback;
  if (validateEmail(email)) {
    noResultsFallback = (
      <MenuItem
        text="Create new contact "
        key={email}
        label={email}
        disabled={false}
        onClick={e => handleClickCreateContact()}
      />
    );
  } else {
    noResultsFallback = (
      <MenuItem
        disabled={true}
        text="No contact found, create user by giving a valid email."
      />
    );
  }

  return (
    <div>
      <p className="delegation__label">Handoff</p>
      <Suggest
        inputValueRenderer={contact => contact.email}
        itemRenderer={(contact, { handleClick, modifiers }) => {
          return (
            <MenuItem
              active={modifiers.active}
              label={contact.email}
              key={contact.email}
              onClick={handleClick}
              text={`${contact.first_name} ${contact.last_name}`}
            />
          );
        }}
        items={contacts}
        onItemSelect={(contact, e) =>
          handleExistingContactSelect(contact.email)
        }
        inputProps={{
          onChange: e => handleContactInfoChange("email", e.target.value),
          onFocus: e => toggleSelected(),
          onBlur: e => toggleSelected(),
          value: email,
          placeholder: "Assign Contact"
        }}
        popoverProps={{ minimal: true }}
        noResults={noResultsFallback}
      />
      <button
        className="btn btn--secondary delegation__edit_btn"
        onClick={handleDelegationCancel}
      >
        Answer Question
      </button>
    </div>
  );
}

export default DelegationContactSelector;
