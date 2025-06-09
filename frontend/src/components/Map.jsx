import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export function Map({ lat, lng, name }) {
  return (
    <MapContainer center={[lat, lng]} zoom={15} className="w-full h-[200px] rounded-lg shadow-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
export default Map;
