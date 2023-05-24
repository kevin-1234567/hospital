import Service from '../api/service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const login = (data, navigate) => async (dispatch) => {
  await Service.login(data).then((e) => {
    if (!e?.data?.data?.accessToken) {
      dispatch({
        type: 'LOGIN',
        payload: e.data.message,
      });
    } else {
      localStorage.setItem('token', e.data.data.accessToken);
      localStorage.setItem('role', e.data.data.role);
      localStorage.setItem('id', e.data.data.id);
      localStorage.setItem('login', e.data.data.login);
      const role = localStorage.getItem('role');
      if (role === 'Patient') {
        navigate('/pdashboard');
        window.location.reload();
      } else {
        navigate('/dash');
        window.location.reload();
      }
    }
  });
};

export const logout = () => async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('id');
  localStorage.removeItem('login');
};
export const signup = (data, navigate) => async (dispatch) => {
  await Service.signup(data).then((e) => {
    if (e.data.status === false) {
      toast.error(e.data.message);
    } else {
      toast.success(e.data.message);
      navigate('/');
    }
  });
};
export const profile = (data) => async (dispatch) => {
  await Service.profile(data).then((e) => {
    dispatch({
      type: 'PROFILE',
      payload: e.data.data,
    });
  });
};
export const getmedicalbyid = (id) => async (dispatch) => {
  await Service.getmedicalbyid(id).then((e) => {
    // console.log('get medical back', e.data.data);
    dispatch({
      type: 'MEDICAL_ID',
      payload: e.data.data,
    });
  });
};

export const medical = (data) => async (dispatch) => {
  await Service.medical(data).then((e) => {});
};
export const getprofileid = (id) => async (dispatch) => {
  await Service.getprofilebyid(id).then((e) => {
    // console.log('get medical back', e.data.data);
    dispatch({
      type: 'PROFILE_ID',
      payload: e.data.data,
    });
  });
};
export const getalldiseases = () => async (dispatch) => {
  await Service.getalldiseases().then((e) => {
    dispatch({
      type: 'ALL_DISEASES',
      payload: e.data.data,
    });
  });
};
export const getallsignup = (id) => async (dispatch) => {
  await Service.getallsignup(id).then((e) => {
    dispatch({
      type: 'SIGNUP_ID',
      payload: e.data.data,
    });
  });
};
export const allhospital = () => async (dispatch) => {
  await Service.allhospital().then((e) => {
    dispatch({
      type: 'ALL_HOSPITAL',
      payload: e.data.data,
      payload2: e.data.data2,
    });
  });
};

export const findconsuldata = (data) => async (dispatch) => {
  await Service.consuldata(data).then((e) => {
    dispatch({
      type: 'CONSOL_DATA',
      payload: e.data.data,
      payload2: e.data.dept,
    });
  });
};
export const consultationsubmit = (data) => async (dispatch) => {
  await Service.consultationsubmit(data).then((e) => {
    console.log(e.data.message);
    toast.success(e.data.message);
  });
};
export const allvaccines = () => async (dispatch) => {
  await Service.allvaccines().then((e) => {
    dispatch({
      type: 'ALL_VACCINES',
      payload: e.data.data,
    });
  });
};
export const vaccinesubmit = (data) => async (dispatch) => {
  await Service.vaccinesubmit(data).then((e) => {
    toast.success(e.data.message);
  });
};
export const listconsultations = (id) => async (dispatch) => {
  await Service.allconsultations(id).then((e) => {
    dispatch({
      type: 'ALL_CONSULTATIONS',
      payload: e.data.data,
    });
  });
};
export const listvaccinations = (id) => async (dispatch) => {
  await Service.allvaccinations(id).then((e) => {
    dispatch({
      type: 'ALL_VACCINATIONS',
      payload: e.data.data,
    });
  });
};
export const listfeedbacks = () => async (dispatch) => {
  await Service.allfeedbacks().then((e) => {
    dispatch({
      type: 'ALL_FEEDBACKS',
      payload: e.data.data,
    });
  });
};
export const adminlistconsultation = () => async (dispatch) => {
  await Service.adminlistconsultation().then((e) => {
    dispatch({
      type: 'ADMIN_LIST_CONSULTATION',
      payload: e.data.data,
    });
  });
};
export const adminlistvaccination = () => async (dispatch) => {
  await Service.adminlistvaccination().then((e) => {
    dispatch({
      type: 'ADMIN_LIST_VACCINATION',
      payload: e.data.data,
    });
  });
};
export const patientcounter = (id) => async (dispatch) => {
  await Service.patientcounter(id).then((e) => {
    dispatch({
      type: 'PATIENT_COUNTER',
      payload: e.data.data,
      payload2: e.data.data2,
      payload3: e.data.data3,
    });
  });
};
export const transhistory = () => async (dispatch) => {
  await Service.tranhistory().then((e) => {
    dispatch({
      type: 'ADMIN_TRAN_LIST',
      payload: e.data.data,
    });
  });
};
export const issueconsultationcertificate = (id) => async (dispatch) => {
  await Service.issueconsultationcertificate(id).then((e) => {
    toast.success(e.data.data);
    dispatch({
      type: 'ISSUE_CONSULTATION_CERTIFICATE',
      payload: e.data.data,
    });
  });
};
export const issuevaccinecertificate = (id) => async (dispatch) => {
  await Service.issuevaccinecertificate(id).then((e) => {
    toast.success(e.data.data);
  });
};
