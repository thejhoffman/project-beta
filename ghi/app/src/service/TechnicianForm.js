import usePostForm from "../hooks/usePostForm";

const TechnicianForm = (props) => {
  const formStructure = {
    name: "",
    employee_id: ""
  };
  const postURL = 'http://localhost:8080/api/technicians/';
  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add technician!</h1>
          <form onSubmit={handleSubmit} id="create-technician-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.name}
                className="form-control"
                placeholder="Technician"
                required
                type="text"
                name="name"
                id="name"
              />
              <label htmlFor="name">Technician</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormData}
                value={formData.employee_id}
                className="form-control"
                placeholder="Employee ID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TechnicianForm;
