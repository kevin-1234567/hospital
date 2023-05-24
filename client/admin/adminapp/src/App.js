import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Signup from './components/signup';
import Patientdash from './components/patientdash';
import Medicaldetails from './components/medicaldetails';
import Patientdashboard from './components/patientdashboard';
import Consultation from './components/consultation';
import Vaccination from './components/vaccination';
import Listconsultation from './components/listconsultation';
import Listvaccinations from './components/listvaccination';
import Feedback from './components/feedback';
import Adminlistconsultation from './components/adminlistconsultations';
import Adminlistvaccination from './components/adminlistvaccination';
import Transactionhistory from './components/transactionhistory';
import { ToastContainer } from 'react-toastify';
import '../src/index.css';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pdash" element={<Patientdash />} />
          <Route path="/pdashboard" element={<Patientdashboard />} />
          <Route path="/medical" element={<Medicaldetails />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/vaccine" element={<Vaccination />} />
          <Route path="/listconsultation" element={<Listconsultation />} />
          <Route path="/listvaccinations" element={<Listvaccinations />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route
            path="/adminlistconsultations"
            element={<Adminlistconsultation />}
          />
          <Route
            path="/adminlistvaccinations"
            element={<Adminlistvaccination />}
          />
          <Route path="/transactionhistory" element={<Transactionhistory />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
