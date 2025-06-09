// components/LocationPickerMap.jsx
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

// Fix icon loading
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom component for search control
function SearchControl({ setPosition, onLocationSelect }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (result) => {
      const { x: lng, y: lat } = result.location;
      setPosition({ lat, lng });
      onLocationSelect([lng, lat]);
    });

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
}

export default function LocationPickerMap({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  function LocationMarker() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect([e.latlng.lng, e.latlng.lat]); // [lng, lat]
      },
    });

    return position === null ? null : <Marker position={position} />;
  }

  return (
    <MapContainer
      center={[12.9080421101289, 77.56651074608816]} // Ranchi
      zoom={15}
      scrollWheelZoom={true}
      className="h-[300px] w-full rounded-md"
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SearchControl setPosition={setPosition} onLocationSelect={onLocationSelect} />
      <LocationMarker />
    </MapContainer>
  );
}



// // components/LocationPickerMap.jsx
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useState } from "react";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// // Fix icon loading
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// export default function LocationPickerMap({ onLocationSelect }) {
//   const [position, setPosition] = useState(null);

//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         setPosition(e.latlng);
//         onLocationSelect([e.latlng.lng, e.latlng.lat]); // note order: [lng, lat]
//       },
//     });

//     return position === null ? null : <Marker position={position} />;
//   }

//   return (
//     <MapContainer
//       center={[23.3441, 85.3096]} // Ranchi
//       zoom={13}
//       scrollWheelZoom={true}
//       className="h-[300px] w-full rounded-md"
//     >
//       <TileLayer
//         attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <LocationMarker />
//     </MapContainer>
//   );
// }


