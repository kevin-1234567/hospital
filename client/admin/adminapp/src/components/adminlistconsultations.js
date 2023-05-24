import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminlistconsultation, issueconsultationcertificate } from '../action';
import DataTable from 'react-data-table-component';
import Web3 from 'web3';
import wrappedTokenDeposit from '../blockChain/consultationCertificate';

const Adminlistconsultation = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(adminlistconsultation());
  }, []);
  const { adminlistconsultations } = useSelector((e) => e.lib);

  const consulcertificate = async (row) => {
    console.log('consultationid', row._id);
    // dispatch(getPatientByID(row));
    if (true) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const netVer = await web3.eth.net.getId();
      localStorage.setItem('walletAddress', accounts[0]);

      const certificationValues = {
        patientName: row.user_details.name,
        patientUUID: JSON.stringify(row.user_details.aadharNo),
        patientRegId: login,
        doctorName: row.doctorId,
        consultationTime: row.time,
        departmentName: row.departmentId,
        hospitalName: row.hospitalId,
        issuerName: row.hospitalId,
        issuerId: '64630948c763d01b5c555117',
        issuedDateTime: Math.floor(new Date().getTime() / 1000.0),
      };
      console.log('certificationValuesMainPage', certificationValues);
      const wrapper = await wrappedTokenDeposit({
        web3,
        address: accounts[0],
        netVer,
        certificationValues,
      });
      console.log('wrapper', wrapper);
      //dispatch(setconsultationCertificate(wrapper));
      dispatch(issueconsultationcertificate(wrapper));
    }
  };
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.user_details.name,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.departmentId,
    },
    {
      name: <b>Doctor</b>,
      selector: (row) => row.doctorId,
    },
    {
      name: <b>Hospital</b>,
      selector: (row) => row.hospitalId,
    },
    {
      name: <b>Time</b>,
      selector: (row) => row.time,
    },
    {
      name: <b>Date</b>,
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: <b>Action</b>,
      selector: (row) => (
        <div>
          <button
            className="btn btn-success"
            onClick={() => consulcertificate(row)}
          >
            Issue Certificate
          </button>
        </div>
      ),
      sortable: true,
    },
  ];
  let tdata = adminlistconsultations;
  return token ? (
    <>
      <div>
        <Navbar />
        <h3>Consultations</h3>
        <DataTable columns={columns} data={tdata} pagination />
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Adminlistconsultation;
