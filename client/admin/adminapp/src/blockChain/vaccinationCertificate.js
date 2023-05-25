// import initiateContractTransaction from './initiateContractTransaction';
// // import getweb3Provider from './web3Provider';
// // import { DEFAULT_NETWORK, NATIVE_CURRENCY } from './constants';
// // import { getNetworkConfigured } from '.';
// import { useDispatch, useSelector } from 'react-redux';
// // import { REciptDataSent } from './actions';

// // import { addSwapValues } from '../../components/common/redux/Approval';
// import VACCINATION_ABI from './VACCINE_ABI';
// let networks;
// const wrappedTokenWithdraw = async ({
//   // walletselect,
//   address,
//   netVer,
//   // accountNumber,
//   web3,
//   // amount,
//   // tokenDecimals,
//   // netVer,
//   dispatch,
// }) => {
//   const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

//   // function getNetworkName(netVer) {
//   //   networks = {
//   //     1: 'Ethereum',
//   //     56: 'Binance SC',
//   //     137: 'Polygon',
//   //     43114: 'Avalanche',
//   //     //Testnets:
//   //     3: 'Ropsten',
//   //     4: 'Rinkeby',
//   //     5: 'Goerli',
//   //     42: 'Kovan',
//   //     97: 'BSC Testnet',
//   //     80001: 'Mumbai',
//   //     11155111: 'Sepolia',
//   //   };
//   //   return networks[netVer];
//   // }

//   // const { default: abi } = await VACCINATION_ABI;
//   function generateRandomNumber() {
//     const min = 1000000000; // Minimum 10-digit number (inclusive)
//     const max = 9999999999; // Maximum 10-digit number (inclusive)

//     const generatedNumbers = new Set();
//     let randomNumber;

//     do {
//       randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//     } while (generatedNumbers.has(randomNumber));

//     generatedNumbers.add(randomNumber);

//     return randomNumber.toString(); // Convert the number to a string
//   }

//   let random = generateRandomNumber();

//   console.log('randomNumber', random);
//   if (netVer === 80001) {
//     const smartContract = await new web3.eth.Contract(
//       VACCINATION_ABI,
//       tokenAddress
//     );

//     const patientName = web3.utils.padRight(
//       web3.utils.fromAscii('Midhun Mohan'),
//       64
//     );
//     const certificateNumber = random;
//     const patientUUID = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
//     const patientRegId = '363004882226';
//     const vaccineName = web3.utils.padRight(
//       web3.utils.fromAscii('Covaccine'),
//       64
//     );
//     const vaccineTakenDatetime = 1684384172;
//     const disease = web3.utils.padRight(web3.utils.fromAscii('Corona'), 64);
//     const antigen = web3.utils.padRight(web3.utils.fromAscii('Covaccine'), 64);
//     const issuerName = web3.utils.padRight(
//       web3.utils.fromAscii('Rahul Kumar'),
//       64
//     );
//     const issuerId = web3.utils.padRight(web3.utils.fromAscii('123'), 64);
//     const issuedDateTime = 1684384172;

//     console.log('first', {
//       certificateNumber,
//       patientName,
//       patientUUID,
//       patientRegId,
//       vaccineName,
//       vaccineTakenDatetime,
//       disease,
//       antigen,
//       issuerName,
//       issuerId,
//       issuedDateTime,
//     });

//     const createCertificationFunction =
//       smartContract.methods.createCertification(
//         certificateNumber,
//         patientName,
//         patientUUID,
//         patientRegId,
//         vaccineName,
//         vaccineTakenDatetime,
//         disease,
//         antigen,
//         issuerName,
//         issuerId,
//         issuedDateTime
//       );

//     const result = await initiateContractTransaction({
//       web3,
//       contractFunction: createCertificationFunction,
//       contractAddress: tokenAddress,
//       address,
//       tokenDecimals: 18,
//       amountValue: 0,
//     });

//     const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
//     await sleep(10000);

//     const subscription = await smartContract.events.CertificationEvent({
//       fromBlock: result.blockNumber,
//     });

//     subscription.on('data', (event) => {
//       // const amountOut = event?.returnValues?.amountOut;
//       console.log('event', event.returnValues);
//     });

//     // const resultofverification = await smartContract.methods
//     //   .verifyCertificateByCertificate(certificateNumber)
//     //   .call();
//     // console.log(
//     //   'resultofverification',
//     //   web3.utils.hexToUtf8(resultofverification.disease)
//     // );
//     if (result) {
//       // dispatch(REciptDataSent({ transactionHash: result?.transactionHash }));
//       console.log('result', result);
//       return result;
//     }
//   } else {
//     console.log('netVer', netVer);
//     alert('Mumbai Network Only Supported');
//   }
// };

// export default wrappedTokenWithdraw;
import initiateContractTransaction from './initiateContractTransaction';
import { v4 as uuidv4 } from 'uuid';

import Vaccination_ABI from './VACCINE_ABI';

const wrappedTokenWithdraw = async ({ address, web3, values }) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  const smartContract = await new web3.eth.Contract(
    Vaccination_ABI,
    tokenAddress
  );
  console.log('values', values);
  const patientName = web3.utils.padRight(
    web3.utils.fromAscii(values?.patientName),
    64
  );
  const certificateNumber = uuidv4();
  const patientUUID = web3.utils.padRight(
    web3.utils.fromAscii(values?.patientUUID),
    64
  );
  const patientRegId = values?.patientRegId;
  const vaccineName = web3.utils.padRight(
    web3.utils.fromAscii(values?.vaccineName),
    64
  );
  const vaccineTakenDatetime = 1684384172;
  const disease = web3.utils.padRight(
    web3.utils.fromAscii(values?.disease),
    64
  );
  const antigen = web3.utils.padRight(
    web3.utils.fromAscii(values?.antigen),
    64
  );
  const issuerName = web3.utils.padRight(
    web3.utils.fromAscii(values?.issuerName),
    64
  );
  const issuerId = web3.utils.padRight(
    web3.utils.fromAscii(values?.issuerId),
    64
  );
  const issuedDateTime = values?.issuedDateTime;
  console.log(
    '****',
    patientName,
    '?',
    certificateNumber,
    '?',
    patientRegId,
    '?',
    vaccineTakenDatetime,
    '?',
    antigen,
    '?',
    issuerName,
    '?',
    issuerId,
    '?',
    issuedDateTime
  );

  const createCertificationFunction = smartContract.methods.createCertification(
    certificateNumber,
    patientName,
    patientUUID,
    patientRegId,
    vaccineName,
    vaccineTakenDatetime,
    disease,
    antigen,
    issuerName,
    issuerId,
    issuedDateTime
  );

  const result = await initiateContractTransaction({
    web3,
    contractFunction: createCertificationFunction,
    contractAddress: tokenAddress,
    address,
    tokenDecimals: 18,
    amountValue: 0,
  });

  console.log('result', result);

  const subscription = await smartContract.events.CertificationEvent({
    fromBlock: result.blockNumber,
  });

  const decodedDataFunction = () =>
    new Promise((resolve) => {
      subscription.on('data', (event) => {
        console.log(event);
        const decodedData = {
          vaccineName: web3.utils.hexToUtf8(event.returnValues.vaccineName),
          vaccineTakenDatetime: event.returnValues.issuedDateTime,
          patientName: web3.utils.hexToUtf8(event.returnValues.patientName),
          certificateNumber: event.returnValues.certificateNumber,
          patientUUID: web3.utils.hexToUtf8(event.returnValues.patientUUID),
          patientRegId: event.returnValues.patientRegId,
          disease: web3.utils.hexToUtf8(event.returnValues.disease),
          antigen: web3.utils.hexToUtf8(event.returnValues.antigen),
          issuerName: web3.utils.hexToUtf8(event.returnValues.issuerName),
          issuerId: web3.utils.hexToUtf8(event.returnValues.issuerId),
          issuedDateTime: event.returnValues.issuedDateTime,
        };

        resolve(decodedData);
      });
    });

  const decodedData = await decodedDataFunction();
  console.log('decodedData', decodedData);

  if (result) {
    return { ...decodedData, transactionHash: result.transactionHash };
  } else {
    throw new Error('No results');
  }
};

export default wrappedTokenWithdraw;
