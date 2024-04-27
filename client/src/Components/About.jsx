import React from "react";
import MapGoogle from "../Components/Elements/MapGoogle";

function About() {
  const location = { lat: 0.382537, lng: 30.495132 };
  return (
    <div className="app-container">
      <div className="title-text">
        <h1 className="text-size-6 text-weight-semibold text-style-neutral">
          About this app
        </h1>
        <p className="text-size-3 text-weight-regular text-style-grey">
          This app was created by student Volodymyr Boiarinov from group
          KN22001. <br /> Below is the map with the location of the university.
        </p>
      </div>
      <MapGoogle location={location} />
    </div>
  );
}

export default About;
