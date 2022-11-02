import useFetch from "../hooks/useFetch";
import usePostForm from "../hooks/usePostForm";

const ServiceForm = (props) => {
  const formStructure = {
    vin: "",
    customer: "",
    date: "",
    time: "",
    technician: "",
    reason: "",
  };
  const fetchURL = 'http://localhost:8080/api/technicians/';
  const postURL = 'http://localhost:8080/api/services/';

  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);
  const [technicians] = useFetch(fetchURL);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Service Appointment</h1>
          <form onSubmit={handleSubmit} id="create-appointment-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.vin}
                className="form-control"
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
              />
              <label htmlFor="vin">Vin</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.customer}
                className="form-control"
                placeholder="customer"
                required
                type="text"
                name="customer"
                id="customer"
              />
              <label htmlFor="customer">Customer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.date}
                className="form-control"
                placeholder="date"
                required
                type="date"
                name="date"
                id="date"
              />
              <label htmlFor="date">Date</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.time}
                className="form-control"
                placeholder="time"
                required
                type="time"
                name="time"
                id="time"
              />
              <label htmlFor="time">Time</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.reason}
                className="form-control"
                placeholder="reason"
                required
                type="text"
                name="reason"
                id="reason"
              />
              <label htmlFor="reason">Reason</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormData}
                value={formData.technician}
                className="form-select"
                required
                name="technician"
                id="technician"
              >
                <option value="">Choose a Technician</option>
                {technicians.map(technician => {
                  return (
                    <option key={technician.employee_id} value={technician.employee_id}>
                      {technician.name}
                    </option>
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
};

export default ServiceForm;
