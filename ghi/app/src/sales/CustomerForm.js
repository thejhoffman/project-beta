import usePostForm from '../hooks/usePostForm';

const CustomerForm = (props) => {
  const formStructure = {
    name: "",
    address: "",
    phone_number: ""
  };
  const postURL = 'http://localhost:8090/api/sales/customers/';
  const [formData, handleFormData, handleSubmit] = usePostForm(formStructure, postURL);

  return (
    <div className=" container mt-2">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add new customer</h1>
            <form onSubmit={handleSubmit} id="add-customer-form">
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
                <textarea
                  onChange={handleFormData}
                  value={formData.address}
                  className="form-control"
                  placeholder="address"
                  required
                  type="text"
                  id="address"
                  name="address"
                  cols="30"
                  rows="4"
                  style={{ height: "100%" }}
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleFormData}
                  value={formData.phone_number}
                  className="form-control"
                  placeholder="phone_number"
                  required
                  type="text"
                  id="phone_number"
                  name="phone_number"
                />
                <label htmlFor="phone_number">Phone number</label>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
