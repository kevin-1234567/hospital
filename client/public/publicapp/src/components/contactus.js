import Navbar from './navbar';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { contactus } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Footer from './footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contactus = () => {
  const dispatch = useDispatch();
  const { contact } = useSelector((e) => e.lib);
  console.log('in component', contact);
  useEffect(() => {
    return () => {
      dispatch({ type: 'CONTACT_RESET' }); // reset contact value to null to avoid unneccessary toaster
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      {contact ? toast.success(contact) : null}
      <Formik
        initialValues={{ name: '', phonenumber: '', email: '', message: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          phonenumber: Yup.string()
            .test('len', 'Phone number must be exactly 10 digits', (val) => {
              if (val) {
                return val.length === 10;
              }
              return true;
            })
            .required('Required'),
          email: Yup.string().required('Email is Required'),
          message: Yup.string().required('Message Required'),
        })}
        onSubmit={(values) => {
          console.log('input values', values);
          dispatch(contactus(values));
        }}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '2% 0% 0% 25%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
              margin: '2% auto',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
              padding: '20px',
            }}
          >
            <h1>Contact Us</h1>

            <label htmlFor="name">
              <b>Name</b>
            </label>
            <Field name="name" type="text" />
            <span className="text-danger">
              <ErrorMessage name="name" />
            </span>
            <label htmlFor="phonenumber">
              <b>Phone Number</b>
            </label>
            <Field
              name="phonenumber"
              type="text"
              style={{ margin: '0% 0% 2% 0%' }}
            />
            <span className="text-danger">
              <ErrorMessage name="phonenumber" />
            </span>
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <Field
              name="email"
              type="email"
              style={{ margin: '0% 0% 2% 0%' }}
            />
            <span className="text-danger">
              <ErrorMessage name="email" />
            </span>
            <label htmlFor="message">
              <b>Message</b>
            </label>
            <Field
              name="message"
              as="textarea"
              style={{ margin: '0% 0% 2% 0%' }}
            />
            <span className="text-danger">
              <ErrorMessage name="message" />
            </span>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      <Footer />
    </div>
  );
};

export default Contactus;
