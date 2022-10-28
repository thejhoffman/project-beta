import React from "react";

class ServiceHistory extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vin: "",
      appointments: [],
    };
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleVinChange(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }

  async handleSearch(event) {
    event.preventDefault();

    const appointmentUrl = 'http://localhost:8080/api/services/';
    const response = await fetch(appointmentUrl);
    if (response.ok) {
      const data = await response.json();
      const appointments = data.services;
      const filteredAppointments = appointments.filter(appointment => appointment.vin === this.state.vin);
      this.setState({ appointments: filteredAppointments });
    }

  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSearch} className="row g-2 mt-4">
          <div className="col">
            <input onChange={this.handleVinChange} className="form-control" type="text"></input>
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
            {this.state.appointments.map(appointment => {
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
  }
}


export default ServiceHistory;
