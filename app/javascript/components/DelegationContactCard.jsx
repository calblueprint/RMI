import React from "react";
import closeIcon from "@fortawesome/fontawesome-free-solid/faTimes";
import FAIcon from "../components/FAIcon";

function DelegationContactCard({
  firstName,
  lastName,
  email,
  handleClickChangeContact,
  handleClickRemoveContact,
  showRemoveContactBtn = true
}) {
  return (
    <div>
      <p className="delegation__label">Handing off question to</p>
      <div className="delegation__card">
        <div className="delegation__card_info">
          <h3>
            {firstName} {lastName}
          </h3>
          <p>{email}</p>
        </div>
        <button
          className="btn btn--secondary delegation__card_change"
          type="button"
          value="Change"
          onClick={handleClickChangeContact}
        >
          Change
        </button>
        {showRemoveContactBtn && (
          <button
            className="btn btn--danger"
            type="button"
            onClick={handleClickRemoveContact}
          >
            <FAIcon iconObj={closeIcon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default DelegationContactCard;
