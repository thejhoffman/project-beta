import useFetch from "../hooks/useFetch";

const VehicleModelList = (props) => {
  const fetchURL = 'http://localhost:8100/api/models/';
  const [vehicleModels] = useFetch(fetchURL);

  const addDefaultSrc = (event) => {
    event.target.src = 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
  };

  return (
    <div className="container mt-2">
      <h1>Vehicle models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {vehicleModels.map((model, index) => {
            return (
              <tr key={index}>
                <td>{model.name}</td>
                <td>{model.manufacturer.name}</td>
                <td><img onError={addDefaultSrc} src={model.picture_url} width="200" alt="car" /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleModelList;
