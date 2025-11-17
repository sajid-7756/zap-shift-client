import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Coverage = () => {
  // const serviceCenter = useLoaderData();
  const [serviceCenters, setServiceCenters] = useState([]);
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];

  useEffect(() => {
    axios("/public/service-center.json").then((data) => {
      setServiceCenters(data.data);
    });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];

      //go to the location
      mapRef.current.flyTo(coord, 13);
    }
  };

  return (
    <div className="my-10 space-y-7">
      <h1 className="text-5xl font-bold text-secondary">
        We are available in 64 districts
      </h1>
      <form onSubmit={handleSearch} className="join">
        <div>
          <label className="input join-item w-62">
            <input type="text" name="location" placeholder="Search location" />
          </label>
        </div>
        <button className="btn btn-primary text-black join-item">Search</button>
      </form>
      <hr className="text-gray-300" />
      <div>
        <MapContainer
          className="w-full h-[800px]"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((serviceCenter, index) => (
            <Marker
              key={index}
              position={[serviceCenter.latitude, serviceCenter.longitude]}
            >
              <Popup>
                <strong>{serviceCenter.district}</strong>
                <br />
                Service Area: {serviceCenter.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
