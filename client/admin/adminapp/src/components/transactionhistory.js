import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transhistory } from '../action';
import DataTable from 'react-data-table-component';

const Transactionhistory = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(transhistory());
  }, []);
  const { tranhist } = useSelector((e) => e.lib);
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.user_details.name,
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.user_details.phoneNumber,
    },
    {
      name: <b>Role</b>,
      selector: (row) => row.user_details.role,
    },
    {
      name: <b>Status</b>,
      selector: (row) => row.status,
    },
    {
      name: <b>Appointment Type</b>,
      selector: (row) => row.appointmentType,
    },
    {
      name: <b>Amount</b>,
      selector: (row) => row.amount,
    },
    {
      name: <b>Transaction Hash</b>,
      selector: (row) => row.transactionHash,
    },
  ];
  let tdata = tranhist;
  return (
    <div>
      <Navbar />
      <h3>Transaction History</h3>
      <DataTable columns={columns} data={tdata} pagination />
    </div>
  );
};

export default Transactionhistory;
