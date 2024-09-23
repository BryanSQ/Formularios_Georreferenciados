import 'leaflet/dist/leaflet.css';
import useFetchData from '../hooks/useFetchData';
import { useParams } from 'react-router-dom';

import Error from './helper/Error';

import customMarker from './helper/CustomMarker';

import API_URL from '../config';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const ResultMap = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(`${API_URL}/forms/results/map/${id}`);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div>
      <h2>Mapa de resultados</h2>
      <MapContainer center={[9.9725447, -84.1963422]} zoom={9} style={{ height: '100vh' }} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          data.map((result, index) => {
            const position = result.answer.split(" ").map((coordinate) => parseFloat(coordinate));
            return (
              <Marker key={index} position={position} icon={customMarker}>
                <Popup>
                  {result.field_name}
                </Popup>
              </Marker>
            );
          })
        }
      </MapContainer>
    </div>
  );
};

export default ResultMap;

