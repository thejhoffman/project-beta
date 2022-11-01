import useFetch from '../hooks/useFetch';
import usePostForm from '../hooks/usePostForm';

const AutomobileForm = (props) => {
  const formStructure = {
    color: "",
    year: "",
    vin: "",
    model_id: ""
  };
  const fetchURL = 'http://localhost:8100/api/models/';
  const postURL = 'http://localhost:8100/api/automobiles/';

  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);
  const [vehicleModels] = useFetch(fetchURL);

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new automobile</h1>
            <form onSubmit={handleSubmit} id="add-automobile-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.color}
                  className="form-control"
                  placeholder="color"
                  required
                  type="text"
                  id="color"
                  name="color"
                />
                <label htmlFor="color">Color</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.year}
                  className="form-control"
                  placeholder="year"
                  required
                  type="number"
                  id="year"
                  name="year"
                />
                <label htmlFor="year">Year</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.vin}
                  className="form-control"
                  placeholder="vin"
                  required
                  type="text"
                  id="vin"
                  name="vin"
                />
                <label htmlFor="vin">VIN</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={handleFormData}
                  value={formData.model_id}
                  className="form-select"
                  required
                  id="model_id"
                  name="model_id"
                >
                  <option value="">Choose a model</option>
                  {vehicleModels.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {`${model.manufacturer.name} ${model.name}`}
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

export default AutomobileForm;
