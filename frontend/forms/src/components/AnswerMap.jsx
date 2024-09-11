import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AnswerMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    // Inicializa el mapa
    const mapInstance = L.map(mapRef.current).setView([9.6301892, -84.2541844], 9);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    // limpiar al desmontar
    return () => {
      mapInstance.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;

        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          const newMarker = L.marker([lat, lng]).addTo(map);
          setMarker(newMarker);
        }

        // Actualiza la posición del marcador en el estado
        setMarkerPosition({ lat, lng });
      });
    }

    return () => {
      if (map) {
        map.off('click');
      }
    };
  }, [map, marker]);

  const handleGetCoordinates = () => {
    if (markerPosition) {
      alert(`Latitud: ${markerPosition.lat}, Longitud: ${markerPosition.lng}`);
    } else {
      alert('No hay marcador en el mapa.');
    }
  };

  return (
    <div>
      <div style={{ height: '400px' }}
        ref={mapRef}
      />
      <button onClick={handleGetCoordinates}>
        Obtener Coordenadas
      </button>
    </div>
  );
};

export default AnswerMap;
