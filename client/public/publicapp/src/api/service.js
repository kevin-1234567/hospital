import Instance from './instance';

export default {
  contactus: (data) => Instance.post('/contact', data), //contactus submission
};
