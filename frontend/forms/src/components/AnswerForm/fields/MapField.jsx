import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.fullscreen';

import fullscreenIcon from '../../../assets/fullscreen.png';
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

const FullscreenControl = () => {
  const map = useMap();
  L.control.fullscreen({ position: 'topleft',
                         title: 'Ver en pantalla completa', 
                         titleCancel: 'Salir de pantalla completa',
                        content: `<img src="${fullscreenIcon}" alt="Fullscreen" style="width: 15px; height: 15px; align-items: center;" />`,}
  ).addTo(map);
  return null; 
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
        <FullscreenControl />
        <AnswerMarker positionChange={handlePositionChange}/>
      </MapContainer>
      <input id={field.id} type_id={field.type.id} name={field.name} type="hidden" readOnly />
    </div>
  );
};

export default MapField;
