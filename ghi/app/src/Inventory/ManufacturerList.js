import React, { useState, useEffect } from 'react';

const ManufacturerList = (props) => {
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8100/api/manufacturers/');
      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-2">
      <h1>Manufacturers</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map(manufacturer => {
            return (
              <tr>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerList;
