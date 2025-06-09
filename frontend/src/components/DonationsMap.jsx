// Map.jsx
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function Map({ donations }) {
  const defaultCenter = [12.910068636791664, 77.56658366840568]; // dsce

  const bounds = donations.length
    ? donations.map(d => [d.latitude, d.longitude])
    : [defaultCenter];

  return (
    <MapContainer
      center={[12.910068636791664, 77.56658366840568]} // dsce or any default center
      zoom={10}
      bounds={bounds}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-lg border"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {donations.map((donation, i) => (
        <Marker key={i} position={[donation.latitude, donation.longitude]}>
          <Popup>
            <strong>{donation.bloodGroup}</strong><br />
            Donor: {donation.donorName}<br />
            Quantity: {donation.quantity} units<br />
            Hospital: {donation.hospitalName}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
