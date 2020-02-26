import React, { useRef } from "react";

import "./Map.css";

const Map = ({ className, styles, center, zoom }) => {
  const mapRef = useRef();
  console.log(mapRef);

  //   useEffect(() => {
  //     const map = new window.google.maps.Map(mapRef.current, {
  //       center,
  //       zoom
  //     });
  //     new window.google.maps.Marker({ position: center, map: map });
  //   }, [center, zoom]);

  return (
    <div className={`map ${className}`} ref={mapRef} styles={styles}>
      <div className="placeholder">MAP PLACEHOLDER</div>
    </div>
  );
};

export default Map;
