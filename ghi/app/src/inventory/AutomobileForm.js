import React, { useState, useEffect } from 'react';

const AutomobileForm = (props) => {
  const [formData, setFormData] = useState({
    color: "",
    year: "",
    vin: "",
    model_id: ""
  });
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

  const handleFormData = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formData };
    const url = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        color: "",
        year: "",
        vin: "",
        model_id: ""
      });
    }
  };

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new automobile</h1>
            <form onSubmit={handleSubmit} id="add-automobile-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.color}
                  className="form-control"
                  placeholder="color"
                  required
                  type="text"
                  id="color"
                  name="color"
                />
                <label htmlFor="color">Color</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.year}
                  className="form-control"
                  placeholder="year"
                  required
                  type="number"
                  id="year"
                  name="year"
                />
                <label htmlFor="year">Year</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.vin}
                  className="form-control"
                  placeholder="vin"
                  required
                  type="text"
                  id="vin"
                  name="vin"
                />
                <label htmlFor="vin">VIN</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.model_id}
                  className="form-select"
                  required
                  id="model_id"
                  name="model_id"
                >
                  <option value="">Choose a model</option>
                  {vehicleModels.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {`${model.manufacturer.name} ${model.name}`}
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

export default AutomobileForm;
