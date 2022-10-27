import React, { useState, useEffect } from 'react';

const VehicleModelForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    picture_url: "",
    manufacturer_id: ""
  });
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

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8100/api/models/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        name: "",
        picture_url: "",
        manufacturer_id: ""
      });
    }
  };

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new vehicle model</h1>
            <form onSubmit={handleSubmit} id="add-vehicle-model-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.name}
                  className="form-control"
                  placeholder="name"
                  required
                  type="text"
                  id="name"
                  name="name"
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.picture_url}
                  className="form-control"
                  placeholder="picture_url"
                  required
                  type="text"
                  id="picture_url"
                  name="picture_url"
                />
                <label htmlFor="picture_url">Picture url</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.manufacturer_id}
                  className="form-select"
                  required
                  id="manufacturer_id"
                  name="manufacturer_id"
                >
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelForm;
