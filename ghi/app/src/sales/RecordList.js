import React, { useState, useEffect } from 'react';

const RecordList = (props) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8090/api/sales/records/');
      if (response.ok) {
        const data = await response.json();
        setRecords(data.records);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container mt-2">
      <h1>Sales records</h1>
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
          {records.map((record, index) => {
            const price = Number(record.price).toLocaleString(
              'en-US', { maximumFractionDigits: 2 }
            );
            return (
              <tr key={index}>
                <td>{record.sales_person.name}</td>
                <td>{record.customer.name}</td>
                <td>{record.automobile.vin}</td>
                <td>{`$${price}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
