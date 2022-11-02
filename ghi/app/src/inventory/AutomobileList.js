import useFetch from '../hooks/useFetch';

const AutomobileList = (props) => {
  const fetchURL = 'http://localhost:8100/api/automobiles/';
  const [automobiles] = useFetch(fetchURL);

  return (
    <div className="container mt-2">
      <h1>Automobiles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Year</th>
            <th>Model</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((auto, index) => {
            return (
              <tr key={index}>
                <td>{auto.vin}</td>
                <td>{auto.color}</td>
                <td>{auto.year}</td>
                <td>{auto.model.name}</td>
                <td>{auto.model.manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AutomobileList;
