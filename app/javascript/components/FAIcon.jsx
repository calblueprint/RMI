import React from "react";
import fontawesome from "@fortawesome/fontawesome";

function FAIcon({ iconObj, style }) {
  return (
    <i
      style={{ fontSize: "14pt", ...style }}
      dangerouslySetInnerHTML={{
        __html: fontawesome.icon(iconObj).html[0]
      }}
    />
  );
}

export default FAIcon;
