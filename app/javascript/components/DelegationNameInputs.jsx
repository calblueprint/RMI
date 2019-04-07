import React from "react";

function DelegationNameInputs({
  handleContactInfoChange,
  handleClickSaveContact
}) {
  return (
    <div>
      <div>
        <p className="delegation__label">First name</p>
        <input
          type="text"
          onChange={e => handleContactInfoChange("firstName", e.target.value)}
        />
        <p className="delegation__label" style={{ marginTop: "10px" }}>
          Last name
        </p>
        <input
          type="text"
          onChange={e => handleContactInfoChange("lastName", e.target.value)}
        />
      </div>
      <button
        type="submit"
        value="Create contact and assign"
        onClick={e => handleClickSaveContact()}
        className="btn btn--primary delegation__assign_btn"
      >
        Create contact and assign
      </button>
    </div>
  );
}

export default DelegationNameInputs;
