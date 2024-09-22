import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import { useParams } from 'react-router-dom';

import MarkerIcon from '../assets/location-pin.png';

import API_URL from '../config';


const ResultMap = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${API_URL}/forms/results/map/${id}`);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (data.length > 0) {
      const mapInstance = L.map('result-map').setView([9.6301892, -84.2541844], 9);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      const myIcon = L.icon({
        iconUrl: MarkerIcon,
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      });

      data.forEach((result) => {
        const coords = result.answer.split(' ');
        const latitude = parseFloat(coords[0]);
        const longitude = parseFloat(coords[1]);
        L.marker([latitude, longitude], {icon: myIcon}).addTo(mapInstance).bindPopup(result.field_name);
      });

      // L.marker([9.6301892, -84.2541844]).addTo(mapInstance);

      setMap(mapInstance);

      return () => {
        mapInstance.remove();
      };
    }
  }, [data]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ocurrió un error al cargar los datos.</p>;
  }

  return (
    <div>
      <h2>Mapa de resultados</h2>
      <div id="result-map" style={{ height: '100vh', width: '100vw'}}></div>
    </div>
  );
};

export default ResultMap;
