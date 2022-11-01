import useFetch from '../hooks/useFetch';
import usePostForm from '../hooks/usePostForm';

const VehicleModelForm = (props) => {
  const formStructure = {
    name: "",
    picture_url: "",
    manufacturer_id: ""
  };
  const fetchURL = 'http://localhost:8100/api/manufacturers/';
  const postURL = 'http://localhost:8100/api/models/';

  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);
  const [manufacturers] = useFetch(fetchURL);

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new vehicle model</h1>
            <form onSubmit={handleSubmit} id="add-vehicle-model-form">
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
                  value={formData.picture_url}
                  className="form-control"
                  placeholder="picture_url"
                  required
                  type="text"
                  id="picture_url"
                  name="picture_url"
                />
                <label htmlFor="picture_url">Picture url</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.manufacturer_id}
                  className="form-select"
                  required
                  id="manufacturer_id"
                  name="manufacturer_id"
                >
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                      <option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModelForm;
