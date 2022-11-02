import { useState } from "react";
import useFetch from "../hooks/useFetch";

const ServiceHistory = (props) => {
  const [vin, setVin] = useState("");
  const fetchURL = 'http://localhost:8080/api/services/';
  const [services] = useFetch(fetchURL);
  const [appointments, setAppointments] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchResults = services.filter(appointment => appointment.vin === vin);
    setAppointments(searchResults);
  };

  const handleVinChange = (e) => {
    setVin(prev => prev = e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="row g-2 mt-4">
        <div className="col">
          <input onChange={handleVinChange} className="form-control" type="text"></input>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Search VIN</button>
        </div>
      </form>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> VIN </th>
            <th> Customer </th>
            <th> Date </th>
            <th> Time </th>
            <th> Technician </th>
            <th> Reason </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.reason}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
};

export default ServiceHistory;
