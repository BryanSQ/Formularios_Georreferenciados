import 'leaflet/dist/leaflet.css';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';

import Error from '../../helper/Error';

import customMarker from '../../helper/CustomMarker';

import API_URL from '../../../config';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


const container = {
  // rounded corners, light gray background, box shadow
  borderRadius: '5px',
  backgroundColor: '#f4f4f4',
  boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
}


export const ResultMap = () => {
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
      <h2>{data.form.name}</h2>
      <p>{data.form.description}</p>
      <div>
        <h3>Descarga de los resultados</h3>
        <a href={`${API_URL}/forms/results/csv/${id}`} download>
          Descargar CSV
        </a>
      </div>
      <MapContainer center={[9.9725447, -84.1963422]} zoom={9} style={{ height: '100vh' }} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          data.results.map(({ submission_id, position, fields }) => {      
            console.log(position);      
            return (
              <Marker key={submission_id} position={position} icon={customMarker}>
                <Popup className='request-popup'>
                {
                  <div>
                    <div>
                      Creado: {data.form.created_at}
                    </div>
                    <div>
                      Ubicacion: {JSON.stringify(position)}
                    </div>
                    {fields.map(({ field_id, field_name, answer }) => (
                      <div key={field_id} style={container}>
                        <h3>{field_name}</h3>
                        <div>
                          <p>{answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                }
                </Popup>
              </Marker>
            );
          })
        }
      </MapContainer>
    </div>
  );
};

