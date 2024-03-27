import React from "react";
import "../../css/infocard.css";

export default function InfoCard(props) {
  return (
    <div className="info-card">
      <p className="text-size-3 text-weight-regular text-style-grey">
        {props.title}
      </p>
      <h2 className="text-size-6 text-weight-semibold text-style-neutral">
        {props.value}
      </h2>
    </div>
  );
}
