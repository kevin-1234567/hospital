import React, { useState } from 'react';
import Web3 from 'web3';
import Navbar from './navbar';
import consultationCertificateVerificationFunction from '../blockchain/certificateVerificationFunction';
import certificateVerificationFunction from '../blockchain/vaccinationCertificateVerify';

const Certificate = () => {
  const [certificateNumber, setCertificateNumber] = useState('');
  const [vaccineCert, setVaccineCert] = useState('');

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
    const startTimestamp = vervacc.issuedDateTime; // Example start timestamp
    const endTimestamp = vervacc.vaccineTakenDatetime;
    const startDate = new Date(startTimestamp * 1000);
    const endDate = new Date(endTimestamp * 1000);
    const startHours = startDate.getHours();
    const endHours = endDate.getHours();

    const startAMPM = startHours >= 12 ? 'PM' : 'AM';
    const endAMPM = endHours >= 12 ? 'PM' : 'AM';
    const returnedCertificates = {
      certificateNumber: vervacc.certificateNumber,
      patientName: web3.utils.hexToUtf8(vervacc.patientName),
      patientUUID: web3.utils.hexToUtf8(vervacc.patientUUID),
      patientRegId: vervacc.patientRegId,
      vaccineName: web3.utils.hexToUtf8(vervacc.vaccineName),
      vaccineTakenDatetime: endHours + ':00' + endAMPM,
      disease: web3.utils.hexToUtf8(vervacc.disease),
      antigen: web3.utils.hexToUtf8(vervacc.antigen),
      issuerName: web3.utils.hexToUtf8(vervacc.issuerName) + 'Hospitals',
      issuerId: web3.utils.hexToUtf8(vervacc.issuerId),
      issuedDateTime: startHours + ':00' + startAMPM,
    };
    console.log('decoded vaccine', returnedCertificates);
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
    </div>
  );
};

export default Certificate;
