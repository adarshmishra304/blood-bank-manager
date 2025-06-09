// components/MapSearch.jsx
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

// Fix default icon issue with Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

function SearchControl({ onSelect }) {
  const map = useMap();
  const controlRef = useRef();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: false,
      autoClose: true,
      retainZoomLevel: false,
      searchLabel: "Enter location",
    });

    controlRef.current = searchControl;
    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat, label } = result.location;
      onSelect({ lat, lng, address: label });
    });

    return () => {
      map.removeControl(controlRef.current);
    };
  }, [map, onSelect]);

  return null;
}

export default function MapSearch({ lat, lng, setLatLng, name }) {
  return (
    <MapContainer center={[lat, lng]} zoom={13} style={{ height: 300, width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <SearchControl onSelect={(loc) => setLatLng(loc)} />
      <Marker position={[lat, lng]}>
        <Popup>{name || "Selected Location"}</Popup>
      </Marker>
    </MapContainer>
  );
}
