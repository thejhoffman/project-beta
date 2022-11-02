import useFetch from '../hooks/useFetch';

const RecordList = (props) => {
  const fetchURL = 'http://localhost:8090/api/sales/records/';
  const [records] = useFetch(fetchURL);

  return (
    <div className="container mt-2">
      <h1>Sales records</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sales person</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => {
            const price = Number(record.price).toLocaleString(
              'en-US', { maximumFractionDigits: 2 }
            );
            return (
              <tr key={index}>
                <td>{record.sales_person.name}</td>
                <td>{record.customer.name}</td>
                <td>{record.automobile.vin}</td>
                <td>{`$${price}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
