import Navbar from './navbar';
import Login from '../components/login';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  allhospital,
  findconsuldata,
  consultationsubmit,
  listconsultations,
} from '../action';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

const Consultation = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const login = localStorage.getItem('login');
  const [hospital, setHospital] = useState('');
  const [department, setDepartment] = useState('');
  const [doctor, setDoctor] = useState('');
  const [time, setTime] = useState('');
  const { allhospitals } = useSelector((e) => e.lib);
  const { docselect } = useSelector((e) => e.lib);
  const { alldepts } = useSelector((e) => e.lib);

  useEffect(() => {
    dispatch(allhospital());
    dispatch(listconsultations());
  }, []);
  const { allconsultations } = useSelector((e) => e.lib);
  console.log('%%%%%%%', allconsultations);
  const hospitalchange = (e) => {
    const hosid = document.getElementById('hospital').value;
    setHospital(hosid);
  };

  const departmentchange = (e) => {
    const did = document.getElementById('department').value;
    const hosid = document.getElementById('hospital').value;
    setDepartment(did);
    dispatch(findconsuldata({ hospitalid: hosid, deparmentid: did }));
  };

  const doctorchange = (e) => {
    setDoctor(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hospitalid = document.getElementById('hospital').value;
    const departmentid = document.getElementById('department').value;
    const doctorid = document.getElementById('doctor').value;
    const time = document.getElementById('time').value;
    const dates = document.getElementById('date').value;
    console.log(hospitalid, departmentid, doctorid, time);

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const netVer = await web3.eth.net.getId();
    const tokenAddress = '0x8C41e857a666D65080c3A153966E6e5f8C45Cfa3';
    const toWei = async (web3, amount, decimals) => {
      return await web3.utils.toWei(
        parseFloat(amount).toFixed(decimals).toString(),
        'ether'
      );
    };
    const getGasPrice = async (web3) => {
      const gasPrice = await web3.eth.getGasPrice();
      return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
    };

    const AmountInWei = await toWei(web3, 0.001, 18);
    console.log('AmountInWei', AmountInWei);
    const GetGasPricesss = await getGasPrice(web3);
    const result = await web3.eth.sendTransaction({
      from: accounts[0],
      to: tokenAddress,
      value: AmountInWei,
      gasPrice: GetGasPricesss,
    });
    console.log('metamask result', result);
    dispatch(
      consultationsubmit({
        hospitalId: hospitalid,
        departmentId: departmentid,
        doctorId: doctorid,
        date: time,
        loginId: login,
        metamaskresult: result,
        times: dates,
      })
    );
  };

  return token ? (
    <>
      <div>
        <Navbar />
        <h3>consultation</h3>
        <button class="btn btn-success">
          <Link to="/listconsultation">List Consultation</Link>
        </button>
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
            <label htmlFor="model">Hospital:</label>
            <select
              type="text"
              id="hospital"
              name="disease"
              onChange={(e) => hospitalchange(e)}
              required
            >
              <option selected>Select Hospital:</option>
              {allhospitals?.map((item, index) => (
                <option key={index} value={item.hospitalId}>
                  {item.hospitalName}
                </option>
              ))}
            </select>
          </div>
          <div className="selectdiv">
            <label htmlFor="model">Department:</label>
            <select
              type="text"
              id="department"
              name="department"
              onChange={(e) => departmentchange(e)}
              required
            >
              <option selected>Select Department</option>
              {alldepts?.map((item, index) => (
                <option key={index} value={item.departmentId}>
                  {item.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="selectdiv">
            <label htmlFor="model">Doctor:</label>
            <select
              type="text"
              id="doctor"
              name="doctor"
              onChange={(e) => hospitalchange(e)}
              required
            >
              {/* <option selected>Select Doctor</option> */}
              {docselect?.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.doctorName}
                </option>
              ))}
            </select>
          </div>

          <div className="selectdiv">
            <label>Time: </label>
            <select type="text" id="time" name="time" required>
              <option value="">Select Time</option>
              <option value="9:00 AM - 10:00 AM">9 AM - 10 AM</option>
              <option value="10:00 AM - 11:00 AM">10 AM - 11 AM</option>
              <option value="11:00 AM - 12:00 AM">11 AM - 12 AM</option>
              <option value="12:00 AM - 1:00 PM">12 AM - 1PM</option>
              <option value="1:00 PM - 2:00 PM">1 PM - 2 PM</option>
              <option value="2:00 PM - 3:00 PM">2 PM - 3PM</option>
              <option value="3:00 PM - 4:00 PM">3 PM - 4PM</option>
              <option value="4:00 PM - 5:00 PM">4 PM - 5PM</option>
              <option value="5:00 PM - 6:00 PM">5 PM - 6PM</option>
            </select>
          </div>
          <div className="selectdiv">
            <label>Date: </label>
            <input
              type="date"
              id="date"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Consultation;
