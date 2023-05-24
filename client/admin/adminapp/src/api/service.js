import Instance from './instance';

export default {
  login: (data) => Instance.post('/login', data),
  signup: (data) => Instance.post('/login/signup', data),
  profile: (data) => Instance.post('/profile', data),
  medical: (data) => Instance.patch('/medical', data),
  getmedicalbyid: (data) => Instance.get(`/medical/getmedical/${data}`),
  getalldiseases: () => Instance.get(`/medical/getalldiseases`),
  getallsignup: (id) => Instance.get(`/login/getallsignup/${id}`),
  allhospital: (id) => Instance.get(`/consultation/hospital`),
  consuldata: (data) => Instance.post(`/consultation/finddata`, data),
  consultationsubmit: (data) =>
    Instance.post(`/consultation/consultationsubmit`, data),
  allvaccines: () => Instance.get(`/vaccination/getvaccines`),
  vaccinesubmit: (data) => Instance.post(`/vaccination/vaccinesubmit`, data),
  allconsultations: (id) => Instance.post(`/consultation/allconsultations`, id),
  allvaccinations: (id) => Instance.post(`/vaccination/allvaccinations`, id),
  allfeedbacks: (id) => Instance.get(`/vaccination/allfeedbacks`),
  adminlistconsultation: (id) =>
    Instance.get(`/consultationcertificate/getconsultation`),
  adminlistvaccination: () =>
    Instance.get(`/consultationcertificate/getvaccination`),
  patientcounter: (data) => Instance.post(`/patientcounter`, data),
  issueconsultationcertificate: (id) =>
    Instance.post(`/consultationcertificate/issueconsultationcertificate`, id),
  tranhistory: () => Instance.get(`/transaction/tranhistory`),
  issuevaccinecertificate: (id) =>
    Instance.post(`/vaccinationcertificate/issuevaccinationcertificate`, id),
};
