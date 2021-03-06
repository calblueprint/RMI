import React from "react";
import { MenuItem } from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";

import validateEmail from "../utils/validateEmail";

function DelegationContactDropdown({
  email,
  handleClickCreateContact,
  handleContactInfoChange,
  handleExistingContactSelect,
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
        onClick={ev => {
          handleClickCreateContact();
          ev.stopPropagation();
        }}
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
              style={{ minWidth: "290px" }}
            />
          );
        }}
        items={contacts}
        onItemSelect={contact => {
          handleExistingContactSelect(contact.email);
        }}
        inputProps={{
          onChange: e => handleContactInfoChange("email", e.target.value),
          onFocus: e => toggleSelected(),
          onBlur: e => toggleSelected(),
          value: email,
          placeholder: "name@email.com",
          style: { minWidth: "300px" },
          inputRef: ref => {
            if (ref) setTimeout(() => ref.focus(), 0);
          }
        }}
        popoverProps={{
          minimal: true
        }}
        noResults={noResultsFallback}
      />
    </div>
  );
}

export default DelegationContactDropdown;
