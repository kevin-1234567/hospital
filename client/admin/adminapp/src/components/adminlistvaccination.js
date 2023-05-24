import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminlistvaccination, issuevaccinecertificate } from '../action';
import DataTable from 'react-data-table-component';
import Web3 from 'web3';
import wrappedTokenWithdraw from '../blockChain/vaccinationCertificate';

const Adminlistvaccination = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(adminlistvaccination());
  }, []);
  const { adminlistvaccinations } = useSelector((e) => e.lib);
  const vaccinecertificate = async (row) => {
    console.log('consultationid', row._id);
    // dispatch(getPatientByID(row));
    if (true) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const values = {
        certificateNumber: 2,
        patientName: row.user_details.name,
        patientUUID: JSON.stringify(row.user_details.aadharNo),
        patientRegId: row.loginId,
        vaccineName: row.vaccineId,
        disease: row.disease,
        antigen: row.antigen,
        issuerName: row.hospitalId,
        issuerId: '64630948c763d01b5c555117',
        issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
      };
      const wrapper = await wrappedTokenWithdraw({
        web3,
        address: accounts[0],
        // netVer,
        values,
      });
      console.log('wrapper', wrapper);
      //dispatch(setconsultationCertificate(wrapper));
      dispatch(issuevaccinecertificate(wrapper));
    }
  };
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.user_details.name,
    },
    {
      name: <b>Date</b>,
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: <b>Time</b>,
      selector: (row) => row.time,
    },
    {
      name: <b>Hospital</b>,
      selector: (row) => row.hospitalId,
    },
    {
      name: <b>Vaccine</b>,
      selector: (row) => row.vaccineId,
    },
    {
      name: <b>Action</b>,
      selector: (row) => (
        <div>
          <button
            className="btn btn-success"
            onClick={() => vaccinecertificate(row)}
          >
            Certificate
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  let tdata = adminlistvaccinations;
  return token ? (
    <>
      <div>
        <Navbar />
        <h3>Vaccinations</h3>
        <DataTable columns={columns} data={tdata} pagination />
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Adminlistvaccination;
