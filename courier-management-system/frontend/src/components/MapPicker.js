// import { useEffect } from "react";

// function MapPicker({ setLocation }) {

//   useEffect(() => {
//   navigator.geolocation.getCurrentPosition((pos) => {
//     setLocation({
//       lat: pos.coords.latitude,
//       lng: pos.coords.longitude
//     });
//   });
// }, [setLocation]); // ✅ Add dependency

//   return <p>📍 Location Auto Selected</p>;
// }

// export default MapPicker;





// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { useEffect, useState } from "react";

// function LocationMarker({ setLocation }) {
//   const [position, setPosition] = useState(null);

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const lat = pos.coords.latitude;
//       const lng = pos.coords.longitude;
//       setPosition([lat, lng]);
//       setLocation({ lat, lng });
//     });
//   }, []);

//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       setPosition([lat, lng]);
//       setLocation({ lat, lng });
//     }
//   });

//   return position ? <Marker position={position} /> : null;
// }

// function MapPicker({ setLocation }) {
//   return (
//     <div style={{ height: 200, marginBottom: 10 }}>
//       <MapContainer center={[20, 77]} zoom={5} style={{ height: "100%" }}>
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationMarker setLocation={setLocation} />
//       </MapContainer>
//     </div>
//   );
// }

// export default MapPicker;













// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import { useEffect, useState } from "react";

// function LocationMarker({ setLocation }) {
//   const [position, setPosition] = useState(null);

//   // ✅ Auto location
//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition((pos) => {
//       const lat = pos.coords.latitude;
//       const lng = pos.coords.longitude;

//       setPosition([lat, lng]);
//       setLocation({ lat, lng });
//     });
//   }, [setLocation]);

//   // ✅ Click to change location
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       setPosition([lat, lng]);
//       setLocation({ lat, lng });
//     }
//   });

//   return position ? (
//     <Marker position={position}>
//       <Popup>
//         📍 Selected Location <br />
//         Lat: {position[0].toFixed(4)} <br />
//         Lng: {position[1].toFixed(4)}
//       </Popup>
//     </Marker>
//   ) : null;
// }

// function MapPicker({ setLocation }) {
//   return (
//     <div style={{
//       height: 250,
//       marginBottom: 15,
//       borderRadius: 10,
//       overflow: "hidden",
//       border: "2px solid #ddd"
//     }}>
//       <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%" }}>
        
//         {/* ✅ Better tiles (colorful map) */}
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <LocationMarker setLocation={setLocation} />

//       </MapContainer>
//     </div>
//   );
// }

// export default MapPicker;
















import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  // Auto location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setPosition([lat, lng]);
      setLocation({ lat, lng });
    });
  }, [setLocation]);

  // Click map
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setLocation({ lat, lng });
    }
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        📍 Selected Location <br />
        Lat: {position[0].toFixed(4)} <br />
        Lng: {position[1].toFixed(4)}
      </Popup>
    </Marker>
  ) : null;
}

function MapPicker({ setLocation }) {
  return (
    <div style={{ height: 250, marginBottom: 10 }}>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>
    </div>
  );
}

export default MapPicker;