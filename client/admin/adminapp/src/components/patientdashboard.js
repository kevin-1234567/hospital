import Navbar from './navbar';
import Login from '../components/login';
import { useDispatch, useSelector } from 'react-redux';
import { getmedicalbyid, getallsignup, patientcounter } from '../action';
import React, { useEffect } from 'react';

const Patientdashboard = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(getmedicalbyid(login));
  }, []);
  useEffect(() => {
    dispatch(getallsignup(login));
  }, []);
  useEffect(() => {
    dispatch(patientcounter({ loginId: login }));
  }, []);
  const { concount, vacccount, amount } = useSelector((e) => e.lib);
  return token ? (
    <>
      <div>
        <Navbar />
        <div className="dashboard-container">
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Consultations</h3>
              <p className="dashboard-value">{concount}</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Total Payment</h3>
              <p className="dashboard-value">{amount}MATIC</p>
            </div>
          </div>
          <div className="dashboard-section">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Vaccinations Taken</h3>
              <p className="dashboard-value">{vacccount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
};
export default Patientdashboard;
