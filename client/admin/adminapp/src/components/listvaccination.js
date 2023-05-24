import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listvaccinations } from '../action';
import DataTable from 'react-data-table-component';

const Listvaccinations = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(listvaccinations({ login: login }));
  }, []);
  const { allvaccinations } = useSelector((e) => e.lib);
  console.log(allvaccinations);
  const columns = [
    {
      name: <b>Vaccine Name</b>,
      selector: (row) => row.vaccineId,
    },
    {
      name: <b>Disease</b>,
      selector: (row) => row.disease,
    },
    {
      name: <b>Antigen</b>,
      selector: (row) => row.antigen,
    },
    {
      name: <b>Hospital</b>,
      selector: (row) => row.hospitalId,
    },
    {
      name: <b>Date</b>,
      selector: (row) => new Date(row.date).toLocaleDateString(),
    },
    {
      name: <b>Time</b>,
      selector: (row) => row.time,
    },
  ];
  let tdata = allvaccinations;
  return token ? (
    <>
      <div>
        <Navbar />
        <h3>List of vaccinations</h3>
        <button class="btn btn-success">
          <Link to="/vaccine">Add Vaccination</Link>
        </button>
        <DataTable columns={columns} data={tdata} pagination />
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Listvaccinations;
