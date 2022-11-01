import React from 'react';

class TechnicianForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: "",
      employee_id: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmployeeId = this.handleChangeEmployeeId.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const technicianUrl = 'http://localhost:8080/api/technicians/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
      const newTechnician = await response.json();
      this.setState({
        name: "",
        employee_id: "",
      });
    }
  }
  handleChangeName(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }
  handleChangeEmployeeId(event) {
    const value = event.target.value;
    this.setState({ employee_id: value });
  }
  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add technician!</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeName} value={this.state.name} placeholder="Technician" required type="text" name="technician" id="technician" className="form-control" />
                <label htmlFor="technician">Technician</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeEmployeeId} value={this.state.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
                <label htmlFor="employee_id">Employee ID</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TechnicianForm;
