import Navbar from './navbar';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../action';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [dob, setDob] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlephoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleaddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleaadharChange = (e) => {
    setAadharNo(e.target.value);
  };
  const handledateChange = (e) => {
    setDob(e.target.value);
  };
  const handlepinChange = (e) => {
    setPinCode(e.target.value);
  };
  const handlecountryChange = (e) => {
    setCountry(e.target.value);
  };
  const handlestateChange = (e) => {
    setState(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleemailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signup(
        {
          name: name,
          phoneNumber: phoneNumber,
          address: address,
          email: email,
          aadharNo: aadharNo,
          dob: dob,
          pinCode: pinCode,
          country: country,
          state: state,
          password: password,
        },
        navigate
      )
    );
  };
  return (
    <div>
      <Navbar />
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
          <label>Name : </label>
          <input type="text" onChange={handleNameChange} required />
        </div>
        <div className="selectdiv">
          <label>Phone Number : </label>
          <input type="number" onChange={handlephoneChange} required />
        </div>
        <div className="selectdiv">
          <label>Address : </label>
          <input type="text" onChange={handleaddressChange} required />
        </div>
        <div className="selectdiv">
          <label>Email : </label>
          <input type="email" onChange={handleemailChange} required />
        </div>
        <div className="selectdiv">
          <label>AadharNumber : </label>
          <input type="number" onChange={handleaadharChange} required />
        </div>
        <div className="selectdiv">
          <label>Date of Birth : </label>
          <input type="date" onChange={handledateChange} required />
        </div>
        <div className="selectdiv">
          <label>Pincode : </label>
          <input type="number" onChange={handlepinChange} required />
        </div>
        <div className="selectdiv">
          <label>Country : </label>
          <input type="text" onChange={handlecountryChange} required />
        </div>
        <div className="selectdiv">
          <label>State: </label>
          <input type="text" onChange={handlestateChange} required />
        </div>
        <div className="selectdiv">
          <label>Password: </label>
          <input type="text" onChange={handlepasswordChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
