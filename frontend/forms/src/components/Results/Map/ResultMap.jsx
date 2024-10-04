import 'leaflet/dist/leaflet.css';
import useFetchData from '../../../hooks/useFetchData';
import { useParams } from 'react-router-dom';

import Error from '../../helper/Error';

import customMarker from '../../helper/CustomMarker';

import API_URL from '../../../config';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './ResultMap.css';

const resultmapStyle = {
  height: '67vh',
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
    <div className='resultsmap'>
      <div className="resultmap-info">
          <h1>{data.form.name}</h1>
          <p>{data.form.description}</p>
          <a href={`${API_URL}/forms/results/csv/${id}`} download>
            Descargar CSV
          </a>
      </div>
      <div className="resultmap-container">
          <MapContainer center={[9.9725447, -84.1963422]} zoom={9} style={ resultmapStyle } >
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
                      <div className = "answers-container">
                        <div className = "creation-date">
                          Fecha de la respuesta: {data.form.created_at}
                        </div>
                        <div>
                          {/*Ubicacion: {JSON.stringify(position)}*/}
                        </div>
                        {fields.map(({ field_id, field_name, answer }) => (
                          <div key={field_id} className="results-container">
                            <h3>{field_name}</h3>
                            <div>
                              <p style={{ 'margin-top': 1, 'margin-bottom': 1} }>{answer}</p>
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
    </div>
  );
};

