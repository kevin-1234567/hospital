import { combineReducers } from 'redux';

const initialState = {
  contact: '',
};
const library = (state = initialState, action) => {
  switch (action.type) {
    case 'CONTACT_US':
      return {
        ...state,
        contact: action.payload,
      };
    case 'CONTACT_RESET':
      return {
        ...state,
        contact: null,
      };
    default:
      return state;
  }
};

export default combineReducers({ dummyReducer: () => '', lib: library });
