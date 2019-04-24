import React from "react";
import closeIcon from "@fortawesome/fontawesome-free-solid/faTimes";
import FAIcon from "../components/FAIcon";

function DelegationContactCard({
  firstName,
  lastName,
  email,
  handleClickChangeContact,
  handleClickRemoveContact,
  showHeader = true,
  showChangeBtn = true,
  showRemoveContactBtn = true,
  label = "Handing off question to"
}) {
  return (
    <div>
      {showHeader ? <p className="delegation__label">{label}</p> : null}
      <div className="delegation__card">
        <div className="delegation__card_info">
          <h3>
            {firstName} {lastName}
          </h3>
          <p>{email}</p>
        </div>
        {showChangeBtn ? (
          <button
            className="btn btn--secondary delegation__card_change"
            type="button"
            value="Change"
            onClick={handleClickChangeContact}
          >
            Change
          </button>
        ) : null}
        {showRemoveContactBtn ? (
          <button
            className="btn btn--danger"
            type="button"
            onClick={handleClickRemoveContact}
          >
            <FAIcon iconObj={closeIcon} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DelegationContactCard;
