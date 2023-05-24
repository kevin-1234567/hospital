import VACCINATION_ABI from './Vaccination_ABI';

const certificateVerificationFunction = async ({ web3, certificateNumber }) => {
  const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

  try {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    return await smartContract.methods
      .verifyCertificateByCertificate(certificateNumber)
      .call();
  } catch (err) {
    throw new Error(err.message);
  }
};

export default certificateVerificationFunction;
