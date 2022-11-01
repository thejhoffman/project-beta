import React from "react";

class ServiceList extends React.Component {
  constructor () {
    super();
    this.state = {
      VIN: "",
      customer: "",
      date: "",
      time: "",
      technician: "",
      appointments: [],
      Reason: "",
    };
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.finishedAppointment = this.finishedAppointment.bind(this);
  }

  async componentDidMount() {
    const appointmentUrl = 'http://localhost:8080/api/services';

    const response = await fetch(appointmentUrl);

    if (response.ok) {
      const data = await response.json();
      const appointments = data.services;
      const filteredAppointments = appointments.filter(appointment => appointment.finished === false);
      this.setState({ appointments: filteredAppointments });
    }
  }
  async cancelAppointment(event) {
    const url = `http://localhost:8080/api/services/${event}/`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    };
    await fetch(url, fetchConfig);
    this.componentDidMount();

  }
  async finishedAppointment(event) {
    const url = `http://localhost:8080/api/services/${event}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify({ finished: true }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    await fetch(url, fetchConfig);
    this.componentDidMount();
  }

  render() {
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
            {this.state.appointments.map(appointment => {
              return (
                <tr key={appointment.id}>
                  <td> <img
                    className={"me-1 mb-1 " + (appointment.vip ? "" : "d-none")}
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
                  <td><button className="btn btn-danger" onClick={(event) => this.cancelAppointment(appointment.id, event)} value={appointment.id}></button>Cancel</td>
                  <td><button className="btn btn-success" onClick={(event) => this.finishedAppointment(appointment.id, event)} value={appointment.id}></button>Finished</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div >
    );
  }
}


export default ServiceList;
