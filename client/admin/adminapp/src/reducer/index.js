import { combineReducers } from 'redux';

const initialstate = {
  loginerrormsg: '',
  logincredentials: '',
  profiles: [],
  getmedicalbyids: [],
  alldiseases: [],
  allsignup: [],
  allhospitals: [],
  docselect: [],
  alldepts: [],
  allvaccine: [],
  allconsultations: [],
  allvaccinations: [],
  allfeedbacks: [],
  adminlistconsultations: [],
  adminlistvaccinations: [],
  concount: '',
  vacccount: '',
  amount: '',
  tranhist: [],
  transcertificate: '',
};

const library = (state = initialstate, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        loginerrormsg: action.payload,
        logincredentials: action.payload2,
      };
    case 'LOGIN_RESET':
      return {
        ...state,
        loginerrormsg: null,
      };
    case 'PROFILE':
      return {
        ...state,
        profiles: action.payload,
      };
    case 'MEDICAL_ID':
      return {
        ...state,
        getmedicalbyids: action.payload,
      };
    case 'ALL_DISEASES':
      return {
        ...state,
        alldiseases: action.payload,
      };
    case 'SIGNUP_ID':
      return {
        ...state,
        allsignup: action.payload,
      };
    case 'ALL_HOSPITAL':
      return {
        ...state,
        allhospitals: action.payload,
        alldepts: action.payload2,
      };
    case 'CONSOL_DATA':
      return {
        ...state,
        docselect: action.payload,
        deptselect: action.payload2,
      };
    case 'ALL_VACCINES':
      return {
        ...state,
        allvaccine: action.payload,
      };
    case 'ALL_CONSULTATIONS':
      return {
        ...state,
        allconsultations: action.payload,
      };
    case 'ALL_VACCINATIONS':
      return {
        ...state,
        allvaccinations: action.payload,
      };
    case 'ALL_FEEDBACKS':
      return {
        ...state,
        allfeedbacks: action.payload,
      };
    case 'ADMIN_LIST_CONSULTATION':
      return {
        ...state,
        adminlistconsultations: action.payload,
      };
    case 'ADMIN_LIST_VACCINATION':
      return {
        ...state,
        adminlistvaccinations: action.payload,
      };
    case 'PATIENT_COUNTER':
      return {
        ...state,
        concount: action.payload,
        vacccount: action.payload2,
        amount: action.payload3,
      };
    case 'ADMIN_TRAN_LIST':
      return {
        ...state,
        tranhist: action.payload,
      };
    case 'ISSUE_CONSULTATION_CERTIFICATE':
      return {
        ...state,
        transcertificate: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({ dummyReducer: () => '', lib: library });
