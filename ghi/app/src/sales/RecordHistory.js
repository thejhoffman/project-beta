import React, { useState, useEffect } from 'react';

const RecordHistory = (props) => {
  const [records, setRecords] = useState([]);
  const [staff, setStaff] = useState([]);
  const [salesPersonID, setSalesPersonID] = useState("");

  // effect for getting initial list of staff members
  useEffect(() => {
    async function fetchStaffData() {
      const response = await fetch('http://localhost:8090/api/sales/staff/');
      if (response.ok) {
        const data = await response.json();
        setStaff(data.staff);
        setSalesPersonID(data.staff[0].id);
      }
    }
    fetchStaffData();
  }, []);

  const handleSalesPerson = (event) => {
    setSalesPersonID(event.target.value);
  };

  // effect for updating records base of change in salesPersonID state
  useEffect(() => {
    async function fetchRecordData() {
      const response = await fetch(`http://localhost:8090/api/sales/staff/${salesPersonID}/records/`);
      if (response.ok) {
        const data = await response.json();
        setRecords(data.records);
      }
    }
    if (salesPersonID !== "") fetchRecordData();
  }, [salesPersonID]);

  return (
    <div className="container mt-2">
      <h1>Sales person history</h1>
      <div className="mb-3">
        <select
          onChange={handleSalesPerson}
          value={salesPersonID}
          className="form-select"
          required
          id="vin"
          name="vin"
        >
          {staff.map(staffMember => {
            return (
              <option key={staffMember.id} value={staffMember.id}>
                {`${staffMember.employee_number} - ${staffMember.name}`}
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
          {records.map((record, index) => {
            const price = Number(record.price).toLocaleString(
              'en-US', { maximumFractionDigits: 2 }
            );
            return (
              <tr key={index}>
                <td>{record.sales_person.name}</td>
                <td>{record.customer.name}</td>
                <td>{record.vin.vin}</td>
                <td>{`$${price}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordHistory;
