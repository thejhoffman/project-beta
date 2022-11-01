import usePostForm from '../hooks/usePostForm';

const StaffForm = (props) => {
  const formStructure = {
    name: "",
    employee_number: ""
  };
  const postURL = 'http://localhost:8090/api/sales/staff/';
  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new sales person</h1>
            <form onSubmit={handleSubmit} id="add-staff-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.name}
                  className="form-control"
                  placeholder="name"
                  required
                  type="text"
                  id="name"
                  name="name"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.employee_number}
                  className="form-control"
                  placeholder="employee_number"
                  required
                  type="number"
                  id="employee_number"
                  name="employee_number"
                />
                <label htmlFor="employee_number">Employee number</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
