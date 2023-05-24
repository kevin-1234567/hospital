import { BrowserRouter, Routes, Route } from 'react-router-dom';
import First from './components/first';
import Contactus from './components/contactus';
import Certificate from './components/verify';
import '../src/index.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/verify" element={<Certificate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
