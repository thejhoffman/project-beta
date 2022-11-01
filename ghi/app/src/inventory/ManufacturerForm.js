import usePostForm from '../hooks/usePostForm';

const ManufacturerForm = (props) => {
  const formStructure = { name: "" };
  const postURL = 'http://localhost:8100/api/manufacturers/';
  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new manufacturer</h1>
            <form onSubmit={handleSubmit} id="add-manufacturer-form">
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
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerForm;
