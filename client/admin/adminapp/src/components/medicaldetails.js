import Navbar from './navbar';
import Login from '../components/login';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getmedicalbyid, medical, getallsignup } from '../action';
import { useNavigate } from 'react-router-dom';
const Medicaldetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const blood = document.getElementById('blood').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const gender = document.getElementById('gender').value;

    dispatch(
      medical({
        blood: blood,
        height: height,
        weight: weight,
        gender: gender,
        loginId: login,
      })
    );
    navigate('/pdash');
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getmedicalbyid(login));
  }, []);
  useEffect(() => {
    dispatch(getallsignup(login));
  }, []);

  const { getmedicalbyids } = useSelector((e) => e.lib);

  const { allsignup } = useSelector((e) => e.lib);
  console.log('in comp', allsignup);

  return token ? (
    <>
      <div>
        <Navbar />
        <h3>Add or Edit Medical Details</h3>
        <form
          onSubmit={handleSubmit}
          className="form-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '2% 0% 0% 25%',
            border: '2px solid',
            borderRadius: '10px',
            backgroundImage: 'linear-gradient(to right, #FFFFFF, #FFFFFF)',
            padding: '20px',
          }}
        >
          <div className="selectdiv">
            <label>Blood: </label>
            <select
              type="text"
              id="blood"
              defaultValue={getmedicalbyids ? getmedicalbyids[0]?.blood : ''}
              name="blood"
              required
            >
              <option value="">Select Blood group</option>
              <option value="O positive">O positive</option>
              <option value="O negative">O negative</option>
              <option value="A positive">A positive</option>
              <option value="A negative">A negative</option>
              <option value="B positive">B positive</option>
              <option value="B negative">B negative</option>
              <option value="AB positive">AB positive</option>
              <option value="AB negative">AB negative</option>
            </select>
          </div>
          <div className="selectdiv">
            <label>Height: </label>
            <input
              type="number"
              defaultValue={getmedicalbyids ? getmedicalbyids[0]?.height : ''}
              id="height"
              required
            />
          </div>
          <div className="selectdiv">
            <label>Weight: </label>
            <input
              type="number"
              defaultValue={getmedicalbyids ? getmedicalbyids[0]?.weight : ''}
              id="weight"
              required
            />
          </div>
          <div className="selectdiv">
            <label>Gender: </label>
            <select
              type="text"
              id="gender"
              defaultValue={getmedicalbyids ? getmedicalbyids[0]?.gender : ''}
              name="gender"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  ) : (
    <Login />
  );
};
export default Medicaldetails;
