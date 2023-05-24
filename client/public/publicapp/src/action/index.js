import Service from '../api/service';

export const contactus = (data) => async (dispatch) => {
  // for contactus submission
  await Service.contactus(data).then((e) => {
    console.log('from back', e.data.message);
    dispatch({
      type: 'CONTACT_US',
      payload: e.data.message,
    });
  });
};
