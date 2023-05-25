import React, { useState } from 'react';
import Web3 from 'web3';
import Navbar from './navbar';
import consultationCertificateVerificationFunction from '../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../blockchain/vaccinationCertificateVerify';

const Certificate = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [vaccineCert, setVaccineCert] = useState('');
  const [vaccinedecodedvalues, setVaccinedecodedvalues] = useState('');
  const [consuldecodedvalues, setConsuldecodedvalues] = useState('');

  // verify consultation certificate
  const verifyConsultation = async (e) => {
    e.preventDefault();
    console.log('consoltation', certificateNumber);
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const verconsul = await consultationCertificateVerificationFunction({
      web3,
      certificateNumber,
    });
    console.log(verconsul);
    const startTimestamp = verconsul.issuedDateTime; // Example start timestamp
    const endTimestamp = verconsul.consultationTime; // Example end timestamp

    const startDate = new Date(startTimestamp * 1000);
    const endDate = new Date(endTimestamp * 1000);
    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startAMPM = startHours >= 12 ? 'PM' : 'AM';
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const returnedconsul = {
      certificateNumber: verconsul.certificateNumber,
      patientName: web3.utils.hexToUtf8(verconsul.patientName),
      patientUUID: web3.utils.hexToUtf8(verconsul.patientUUID),
      patientRegId: verconsul.patientRegId,
      doctorName: web3.utils.hexToUtf8(verconsul.doctorName),
      consultationTime: endHours + ':00' + endAMPM,
      departmentName: web3.utils.hexToUtf8(verconsul.departmentName),
      hospitalName: web3.utils.hexToUtf8(verconsul.hospitalName) + 'Hospitals',
      issuerName: web3.utils.hexToUtf8(verconsul.issuerName),
      issuerId: web3.utils.hexToUtf8(verconsul.issuerId),
      issuedDateTime: startHours + ':00' + startAMPM,
    };
    console.log('decoded consultation', setConsuldecodedvalues(returnedconsul));
  };
  // verify vaccineation certificate

  const handleCertificateNumberChange = (e) => {
    setCertificateNumber(e.target.value);
  };

  const verifyVaccination = async (e) => {
    e.preventDefault();
    console.log('vaccine', vaccineCert);
    const web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();

    const vervacc = await certificateVerificationFunction({
      web3,
      certificateNumber: vaccineCert,
    });
    console.log(vervacc);

    const returnedCertificates = {
      vaccineName: web3.utils.hexToUtf8(vervacc.vaccineName),
      vaccineTakenDatetime: vervacc.issuedDateTime,
      patientName: web3.utils.hexToUtf8(vervacc.patientName),
      certificateNumber: vervacc.certificateNumber,
      patientUUID: web3.utils.hexToUtf8(vervacc.patientUUID),
      patientRegId: vervacc.patientRegId,
      disease: web3.utils.hexToUtf8(vervacc.disease),
      antigen: web3.utils.hexToUtf8(vervacc.antigen),
      issuerName: web3.utils.hexToUtf8(vervacc.issuerName),
      issuerId: web3.utils.hexToUtf8(vervacc.issuerId),
      issuedDateTime: vervacc.issuedDateTime,
    };
    console.log(
      'decoded vaccine',
      setVaccinedecodedvalues(returnedCertificates)
    );
  };

  const handleVaccinationChange = (e) => {
    setVaccineCert(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div id="certificate" className="p-5 mt-5 mb-5">
        <div className="text-center text-green">
          <h2 className="text-decoration-underline">CERTIFICATE</h2>
        </div>
        <form
          className="form-search"
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
          onSubmit={verifyVaccination}
        >
          <div className="mt-5">
            <h6>Verify vaccine certification</h6>
          </div>
          <input
            className="mt-3"
            type="search"
            name="search"
            placeholder="search your certificate no.."
            onChange={handleVaccinationChange}
            value={vaccineCert}
          />
          <br></br>
          <button type="submit">Search</button>
        </form>
        <form
          className="form-search"
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
          onSubmit={verifyConsultation}
        >
          <div className="mt-5">
            <h6 className="fw-bold">Verify consultation certificate</h6>
          </div>
          <input
            className="mt-3"
            type="search"
            name="search"
            placeholder="search your certificate no.."
            value={certificateNumber}
            onChange={handleCertificateNumberChange}
          />
          <br></br>
          <button type="submit">Search</button>
        </form>
      </div>
      {vaccinedecodedvalues && (
        <div class="card">
          <h3>{vaccinedecodedvalues.patientName}</h3>
          <h3>{vaccinedecodedvalues.antigen}</h3>
          <h3>{vaccinedecodedvalues.issuerName}</h3>
          <h3>{vaccinedecodedvalues.vaccineName}</h3>
        </div>
      )}
      {consuldecodedvalues && (
        <div class="card">
          <h3>{consuldecodedvalues.patientName}</h3>
          <h3>{consuldecodedvalues.hospitalName}</h3>
          <h3>{consuldecodedvalues.doctorName}</h3>
          <h3>{consuldecodedvalues.departmentName}</h3>
        </div>
      )}
    </div>
  );
};

export default Certificate;
