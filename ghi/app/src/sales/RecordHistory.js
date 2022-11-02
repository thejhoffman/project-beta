import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';

const RecordHistory = (props) => {
  const [salesPersonID, setSalesPersonID] = useState("0");
  const fetchURLs = {
    staff: 'http://localhost:8090/api/sales/staff/',
    records: `http://localhost:8090/api/sales/staff/${salesPersonID}/records/`
  };
  const [records] = useFetch(fetchURLs.records);
  const [staff] = useFetch(fetchURLs.staff);

  useEffect(() => {
    if (staff.length > 0)
      setSalesPersonID(staff[0].id);
  }, [staff]);

  const handleSalesPerson = (event) => {
    setSalesPersonID(event.target.value);
  };

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

export default RecordHistory;
