import CONSULTATION_ABI from './Vaccination_ABI';

const consultationCertificateVerificationFunction = async ({
  web3,
  certificateNumber,
}) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  try {
    const smartContract = await new web3.eth.Contract(
      CONSULTATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default consultationCertificateVerificationFunction;
