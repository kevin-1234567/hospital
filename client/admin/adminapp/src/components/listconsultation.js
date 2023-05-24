import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listconsultations } from '../action';
import DataTable from 'react-data-table-component';

const Listconsultation = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(listconsultations({ login: login }));
  }, []);
  const { allconsultations } = useSelector((e) => e.lib);
  const columns = [
    {
      name: <b>Time</b>,
      selector: (row) => row.time,
    },
    {
      name: <b>Date</b>,
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: <b>Hospital</b>,
      selector: (row) => row.hospitalId,
    },
    {
      name: <b>Department</b>,
      selector: (row) => row.departmentId,
    },
    {
      name: <b>Doctor</b>,
      selector: (row) => row.doctorId,
    },
  ];
  let tdata = allconsultations;
  return token ? (
    <>
      <div>
        <Navbar />
        <button class="btn btn-success">
          <Link to="/consultation">Add Consultation</Link>
        </button>
        <h3>List of consultations</h3>
        <DataTable columns={columns} data={tdata} pagination />
      </div>
    </>
  ) : (
    <Login />
  );
};
export default Listconsultation;
