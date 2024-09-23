import L from 'leaflet';
import MarkerIcon from '../../assets/location-pin.png';

const customMarker = L.icon({
  iconUrl: MarkerIcon,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export default customMarker;