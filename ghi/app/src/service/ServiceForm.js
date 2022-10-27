import React from 'react';

class ServiceForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      vin: "",
      customer: "",
      date: "",
      time: "",
      technician: "",
      technicians: [],
      reason: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeVin = this.handleChangeVin.bind(this);
    this.handleChangeCustomerName = this.handleChangeCustomerName.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.handleChangeTechnician = this.handleChangeTechnician.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
  }
  async componentDidMount() {
    const url = 'http://localhost:8080/api/technicians/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    // const employee_id = data.technician;
    // data.employee_id = employee_id;
    // delete data.technician;
    delete data.technicians;

    const serviceUrl = 'http://localhost:8080/api/services/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(serviceUrl, fetchConfig);
    if (response.ok) {
      const newService = await response.json();
      this.setState({
        customer: "",
        vin: "",
        date: "",
        time: "",
        technician: "",
        reason: "",
      });
    }
  }
  handleChangeCustomerName(event) {
    const value = event.target.value;
    this.setState({ customer: value });
  }
  handleChangeVin(event) {
    const value = event.target.value;
    this.setState({ vin: value });
  }
  handleChangeDate(event) {
    const value = event.target.value;
    this.setState({ date: value });
  }
  handleChangeTime(event) {
    const value = event.target.value;
    this.setState({ time: value });
  }
  handleChangeTechnician(event) {
    const value = event.target.value;
    this.setState({ technician: value });
  }
  handleChangeReason(event) {
    const value = event.target.value;
    this.setState({ reason: value });
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Service Appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeVin} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeCustomerName} value={this.state.customer_name} placeholder="Customer Name" required type="text" name="customer_name" id="customer_name" className="form-control" />
                <label htmlFor="customer_name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeDate} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control" />
                <label htmlFor="appt_date_time">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeTime} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control" />
                <label htmlFor="appt_date_time">Time</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeReason} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                <label htmlFor="picture_url">Reason</label>
              </div>
              <div className="mb-3">
                <select value={this.state.technician} onChange={this.handleChangeTechnician} required name="Technician" id="technician" className="form-select">
                  <option value="">Choose a Technician</option>
                  {this.state.technicians.map(technician => {
                    return (
                      <option key={technician.employee_id} value={technician.employee_id}>{technician.name}</option>
                    );
                  }
                  )}
                </select>
              </div>
              <button className="btn btn-primary">Create Service </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceForm;
