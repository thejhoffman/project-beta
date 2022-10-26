import React, { useState, useEffect } from 'react';

const RecordHistory = (props) => {
  const [records, setRecords] = useState([]);
  const [staff, setStaff] = useState([]);
  const [salesPerson, setSalesPerson] = useState("");

  useEffect(() => {
    async function fetchData() {
      const urls = [
        'http://localhost:8090/api/sales/records/',
        'http://localhost:8090/api/sales/staff/'
      ];
      const requests = urls.map(url => fetch(url));
      const responses = await Promise.all(requests);
      responses.forEach(async response => {
        if (response.ok) {
          const data = await response.json();
          if (data.records) setRecords(data.records);
          if (data.staff) {
            setStaff(data.staff);
            setSalesPerson(data.staff[0].name);
          }
        }
      });
    }
    fetchData();
  }, []);

  const handleSalesPerson = (event) => {
    setSalesPerson(event.target.value);

  };

  return (
    <div className="container mt-2">
      <h1>Sales person history</h1>
      <div className="mb-3">
        <select
          onChange={handleSalesPerson}
          value={salesPerson}
          className="form-select"
          required
          id="vin"
          name="vin"
        >
          {staff.map(staffMember => {
            return (
              <option key={staffMember.id} value={staffMember.name}>
                {staffMember.name}
              </option>
            );
          })}
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {records.filter(record => {
            console.log(record.sales_person);
            console.log(salesPerson);
            return record.sales_person === salesPerson;
          }).map((record, index) => {
            return (
              <tr key={index}>
                <td>{record.sales_person}</td>
                <td>{record.customer}</td>
                <td>{record.vin}</td>
                <td>{record.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordHistory;
