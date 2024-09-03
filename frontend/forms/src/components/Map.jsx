import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ latitude, longitude }) => {

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = window.L.map("map").setView([latitude, longitude], 8);

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    setMap(mapInstance);

    mapInstance.on("click", (e) => {
      const { lat, lng } = e.latlng;
      console.log({lat, lng});
      if (marker) {
        marker.setLatLng([lat, lng]).openPopup();
      }
      else{
        const newMarker = window.L.marker([lat, lng]).addTo(mapInstance)
          .bindPopup(`Marker at ${lat.toFixed(2)}, ${lng.toFixed(2)}`).openPopup();

        setMarker(newMarker);
      }
    });

    

    return () => {
      mapInstance.remove();
    };

  }, [marker]);

  return(
    <div id="map" style={{ height: "600px", width:"800px" }}>

    </div>
  );
};

export default Map;