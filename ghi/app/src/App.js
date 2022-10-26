import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
// Inventory imports
import ManufacturerList from './inventory/ManufacturerList';
import ManufacturerForm from './inventory/ManufacturerForm';
import VehicleModelList from './inventory/VehicleModelList';
import VehicleModelForm from './inventory/VehicleModelForm';
import AutomobileList from './inventory/AutomobileList';
import AutomobileForm from './inventory/AutomobileForm';
// Service imports
import TechnicianForm from './service/TechnicianForm';
import TechnicianList from './service/TechnicianList';
import ServiceForm from './service/ServiceForm';
// Sales imports
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
          {/* Inventory Routes */}
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="new_manufacturer" element={<ManufacturerForm />} />
          <Route path="/vehicle_models" element={<VehicleModelList />} />
          <Route path="/new_vehicle_model" element={<VehicleModelForm />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/new_automobile" element={<AutomobileForm />} />
          {/* Service Routes */}
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/new_service" element={<ServiceForm />} />
          {/* Sales Routes */}
          <Route path="/records" element={<RecordList />} />
          <Route path="/record_history" element={<RecordHistory />} />
          <Route path="/new_customer" element={<CustomerForm />} />
          <Route path="/new_sales_person" element={<StaffForm />} />
          <Route path="/new_record" element={<RecordForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
