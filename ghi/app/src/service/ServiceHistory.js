import React from 'react';

class ServiceHistory extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            vin: "",
            appointments: [],
            noAppointments: false,

        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    async handleSearch(event) {
        event.preventDefault();
        const searchUrl = 'http://localhost:8080/api/service_appointments/vin/${this.state.vin}/';
        const fetchConfig = {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
            },
        };
        const response = await fetch(searchUrl, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            this.setState({
                appointments: data.appointments,
                noAppointments: false,
            });
        } else {
            // appointments: [],;
            // noAppointments: true,
            // })
        }
    }
    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }
    render() {

    }

}
