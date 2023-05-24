import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/login';
import {
  getmedicalbyid,
  getalldiseases,
  getallsignup,
  profile,
  medical,
} from '../action';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';

const Patientdash = () => {
  const [disease, setDisease] = useState('');
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [deleteModalConfig, setDeleteModalConfig] = useState({
    showModal: false,
  });
  const onCloseModal = () => {
    setDeleteModalConfig({
      showModal: false,
      deleteId: null,
    });
    window.location.reload();
  };
  const adddisease = (id) => {
    setDeleteModalConfig({
      showModal: true,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      medical({
        diseaseName: disease,
        startDate: date,
        remarks: remarks,
        loginId: login,
      })
    );
    setDeleteModalConfig({
      showModal: false,
      deleteId: null,
    });
    window.location.reload();
  };
  const getDataFromDb = (e) => {
    const getdisease = document.getElementById('disease').value;
    setDisease(getdisease);
  };
  const handledateChange = (e) => {
    setDate(e.target.value);
  };
  const handleremarkChange = (e) => {
    setRemarks(e.target.value);
  };
  const login = localStorage.getItem('login');
  const dispatch = useDispatch();
  const id = localStorage.getItem('id');
  useEffect(() => {
    dispatch(profile({ id: id }));
  }, []);
  useEffect(() => {
    dispatch(getallsignup(login));
  }, []);
  const { profiles } = useSelector((e) => e.lib);
  const token = localStorage.getItem('token');
  const { getmedicalbyids } = useSelector((e) => e.lib);
  const { alldiseases } = useSelector((e) => e.lib);
  useEffect(() => {
    dispatch(getmedicalbyid(login));
  }, []);
  useEffect(() => {
    dispatch(getalldiseases());
  }, []);
  const startedDate = new Date(getmedicalbyids[0]?.startedDate);
  const datePart = getmedicalbyids[0]?.startedDate
    ? startedDate.toISOString().slice(0, 10)
    : null;
  console.log('$$$$$$$$$', getmedicalbyids[0]?.diseases);
  const columns = [
    {
      name: <b>Disease Name</b>,
      selector: (row) => row.diseaseName,
    },
    {
      name: <b>Start Date</b>,
      selector: (row) => row.startDate,
    },
    {
      name: <b>Remarks</b>,
      selector: (row) => row.remarks,
    },
  ];
  let tdata = getmedicalbyids[0]?.diseases;
  return token ? (
    <>
      <div>
        <Navbar />
        <Modal
          isOpen={deleteModalConfig.showModal}
          contentLabel="Minimal Modal Example"
        >
          <button className="btn btn-danger" onClick={() => onCloseModal()}>
            Back
          </button>
          <form
            onSubmit={handleSubmit}
            className="form-container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              margin: '2% 0% 0% 25%',
            }}
          >
            {' '}
            <div className="selectdiv">
              <label htmlFor="model">Disease:</label>
              <select
                type="text"
                id="disease"
                name="disease"
                onChange={(e) => getDataFromDb(e)}
                required
              >
                <option selected>Select Disease</option>
                {alldiseases?.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectdiv">
              <label>started Date : </label>
              <input
                type="date"
                max={new Date().toISOString().split('T')[0]}
                onChange={handledateChange}
                required
              />
            </div>
            <div className="selectdiv">
              <label>Remarks :</label>
              <textarea
                id="remarks"
                name="remarks"
                rows="4"
                cols="50"
                onChange={handleremarkChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </form>
        </Modal>
        <div className="profile-container">
          <div className="profile-header">
            <h1>Profile</h1>
          </div>
          <div className="profile-content">
            <div className="profile-details">
              <h2>Name : {profiles.name}</h2>
              <p>Phone :{profiles.phoneNumber}</p>
              <p>Address :{profiles.address}</p>
              <p>Adhaar :{profiles.aadharNo}</p>
              <p>Pincode :{profiles.pinCode}</p>
              <p>Country :{profiles.country}</p>
              <p>State :{profiles.state}</p>
              <p>
                Blood Group :{getmedicalbyids ? getmedicalbyids[0]?.blood : ''}
              </p>
              <p>Height :{getmedicalbyids ? getmedicalbyids[0]?.height : ''}</p>
              <p>Weight :{getmedicalbyids ? getmedicalbyids[0]?.weight : ''}</p>
              <p>Gender :{getmedicalbyids ? getmedicalbyids[0]?.gender : ''}</p>
              <button
                className="btn btn-danger"
                onClick={() => adddisease(getmedicalbyids[0]?.loginId)}
              >
                Add Disease
              </button>
              <DataTable columns={columns} data={tdata} pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Login />
  );
};

export default Patientdash;
