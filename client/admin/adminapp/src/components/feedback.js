import Navbar from './navbar';
import Login from '../components/login';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listfeedbacks } from '../action';
import DataTable from 'react-data-table-component';
const Feedback = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  useEffect(() => {
    dispatch(listfeedbacks());
  }, []);
  const { allfeedbacks } = useSelector((e) => e.lib);
  const columns = [
    {
      name: <b>Name</b>,
      selector: (row) => row.name,
    },
    {
      name: <b>Phone</b>,
      selector: (row) => row.phonenumber,
    },
    {
      name: <b>Email</b>,
      selector: (row) => row.email,
    },
    {
      name: <b>Message</b>,
      selector: (row) => row.message,
    },
  ];
  let tdata = allfeedbacks;
  return token ? (
    <>
      <div>
        <Navbar />
        <h3>Feedbacks</h3>
        <DataTable columns={columns} data={tdata} pagination />
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Feedback;
