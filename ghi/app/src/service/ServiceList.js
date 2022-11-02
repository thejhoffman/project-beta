import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const ServiceList = (props) => {
  const fetchURL = 'http://localhost:8080/api/services';
  const [appointments, updateAppointments] = useFetch(fetchURL);
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // const filteredAppointments = appointments.filter(appointment => appointment.finished === false);

  useEffect(() => {
    setFilteredAppointments(appointments.filter(appointment => {
      return !(appointment.canceled || appointment.finished);
    }));
  }, [appointments]);

  const handleButtons = async (e) => {
    const url = `http://localhost:8080/api/services/${e.target.value}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify({ [e.target.name]: true }),
      headers: { "Content-Type": "application/json" }
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      updateAppointments();
    }
  };

  return (
    <div className="container">
      <h1>Service Appointments</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th> VIP </th>
            <th> VIN </th>
            <th> Customer </th>
            <th> Date </th>
            <th> Time </th>
            <th> Technician </th>
            <th> Reason </th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map(appointment => {
            return (
              <tr key={appointment.id}>
                <td> <img
                  className={"mb-1 " + (appointment.vip ? "" : "d-none")}
                  src="https://cdn-icons-png.flaticon.com/512/2521/2521013.png"
                  height="20"
                  alt="vip"
                /></td>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.technician.name}</td>
                <td>{appointment.reason}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleButtons}
                    value={appointment.id}
                    name="canceled"
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleButtons}
                    value={appointment.id}
                    name="finished"
                  >
                    Finished
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
};
export default ServiceList;
