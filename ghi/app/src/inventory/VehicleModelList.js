import React, { useState, useEffect } from 'react';

const VehicleModelList = (props) => {
  const [vehicleModels, setVehicleModels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8100/api/models/');
      if (response.ok) {
        const data = await response.json();
        setVehicleModels(data.models);
      }
    }
    fetchData();
  }, []);

  const addDefaultSrc = (event) => {
    event.target.src = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  };

  return (
    <div className="container mt-2">
      <h1>Vehicle models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels.map((model, index) => {
            return (
              <tr key={index}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td><img onError={addDefaultSrc} src={model.picture_url} width="200" alt="car" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleModelList;
