import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import usePostForm from '../hooks/usePostForm';

const RecordForm = (props) => {
  const formStructure = {
    automobile: "",
    sales_person: "",
    customer: "",
    price: ""
  };
  const fetchURLs = {
    autos: 'http://localhost:8100/api/automobiles/',
    staff: 'http://localhost:8090/api/sales/staff/',
    customers: 'http://localhost:8090/api/sales/customers/',
    records: 'http://localhost:8090/api/sales/records/'
  };
  const postURL = 'http://localhost:8090/api/sales/records/';

  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);
  const [automobiles] = useFetch(fetchURLs.autos);
  const [staff] = useFetch(fetchURLs.staff);
  const [customers] = useFetch(fetchURLs.customers);
  const [records, updateRecords] = useFetch(fetchURLs.records);

  const [vinsList, setVinsList] = useState([]);
  const [filteredAutos, setFilteredAutos] = useState([]);

  useEffect(() => {
    setVinsList(records.map(record => record.automobile.vin));
  }, [records]);

  useEffect(() => {
    setFilteredAutos(automobiles.filter(auto => !vinsList.includes(auto.vin)));
  }, [automobiles, vinsList]);

  const handleSubmitWithUpdate = (event) => {
    handleSubmit(event);
    updateRecords();
  };

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create sales record</h1>
            <form onSubmit={handleSubmitWithUpdate} id="add-record-form">
              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.automobile}
                  className="form-select"
                  required
                  id="automobile"
                  name="automobile"
                >
                  <option value="">Choose an automobile</option>
                  {filteredAutos.map(auto => {
                    return (
                      <option key={auto.id} value={auto.vin}>
                        {`${auto.year} ${auto.model.manufacturer.name} ${auto.model.name} (${auto.vin})`}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.sales_person}
                  className="form-select"
                  required
                  id="sales_person"
                  name="sales_person"
                >
                  <option value="">Choose a sales person</option>
                  {staff.map(salesPerson => {
                    return (
                      <option key={salesPerson.id} value={salesPerson.id}>
                        {salesPerson.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.customer}
                  className="form-select"
                  required
                  id="customer"
                  name="customer"
                >
                  <option value="">Choose a customer</option>
                  {customers.map(customer => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.price}
                  className="form-control"
                  placeholder="price"
                  required
                  step="0.01"
                  type="number"
                  id="price"
                  name="price"
                />
                <label htmlFor="price">Price</label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
