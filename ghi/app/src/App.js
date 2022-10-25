import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerList from './inventory/ManufacturerList';
import ManufacturerForm from './inventory/ManufacturerForm';
import VehicleModelList from './inventory/VehicleModelList';
import VehicleModelForm from './inventory/VehicleModelForm';
import AutomobileList from './inventory/AutomobileList';
import AutomobileForm from './inventory/AutomobileForm';
// Service imports here
import RecordList from './sales/RecordList';
import RecordHistory from './sales/RecordHistory';
import CustomerForm from './sales/CustomerForm';
import StaffForm from './sales/StaffForm';
import RecordForm from './sales/RecordForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="/vehicle_models" element={<VehicleModelList />} />
          <Route path="/vehicle_models/new" element={<VehicleModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />
          {/* Service Routes Here */}
          <Route path="/records" element={<RecordList />} />
          <Route path="/records/history" element={<RecordHistory />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/staff/new" element={<StaffForm />} />
          <Route path="/records/new" element={<RecordForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
