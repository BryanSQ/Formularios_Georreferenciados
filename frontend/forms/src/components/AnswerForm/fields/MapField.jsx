import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';

import customMarker from '../../helper/CustomMarker';

const AnswerMarker = ({ positionChange }) => {
  const [position, setPosition] = useState(null);

  useMapEvent('click', (e) => {
    setPosition(e.latlng);
    positionChange(e.latlng);
  });

  return position === null ? null : (
      <Marker position={position} icon={customMarker} />
  );
};


const MapField = ({ field }) => {

  const handlePositionChange = (coordinates) => {
    const input = document.getElementById(field.id);
    input.value = `${coordinates.lat},${coordinates.lng}`;
  }

  return (
    <div>
      <MapContainer center={[9.9725447, -84.1963422]} zoom={9} style={{ height: '400px' }} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AnswerMarker positionChange={handlePositionChange}/>
      </MapContainer>
      <input id={field.id} type_id={field.type.id} name={field.name} type="hidden" readOnly />
    </div>
  );
};

export default MapField;
