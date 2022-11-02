import useFetch from "../hooks/useFetch";

const ManufacturerList = (props) => {
  const fetchURL = 'http://localhost:8100/api/manufacturers/';
  const [manufacturers] = useFetch(fetchURL);

  return (
    <div className="container mt-2">
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer, index) => {
            return (
              <tr key={index}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManufacturerList;
