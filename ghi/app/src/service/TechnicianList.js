function TechnicianList(props) {
    return (
      <div className="container">
        <h2 className="display-5 fw-bold">List of Technician</h2>
        <div className="row">
          {props.technicians.map(technician => {
            return (
              <div key={technician.id} className="col">
                <div className="card mb-3 shadow">
                  <div className="card-body">
                    <h5 className="card-title">{technician.name}</h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  export default TechnicianList
