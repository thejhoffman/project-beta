import React from "react";

class ServiceHistory extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            vin: "",
            appointments: [],
            // services: [],
        };
        this.handleVinChange = this.handleVinChange.bind(this);
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }

    async componentDidMount() {
        const appointmentUrl = 'http://localhost:8080/api/services/';

        const response = await fetch(appointmentUrl);

        if (response.ok) {
            const data = await response.json();
            const appointments = data.appointment;
        }
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th> VIN </th>
                            <th> Customer Name </th>
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
                                    <td>{appointment.new_vin}</td>
                                    <td>{appointment.name}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.technician.name}</td>
                                    <td>{appointment.reason}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }


}


export default ServiceHistory;
