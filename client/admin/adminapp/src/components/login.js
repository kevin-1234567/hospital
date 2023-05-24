import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../action';
import * as Yup from 'yup';
import Navbar from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginerrormsg } = useSelector((e) => e.lib);
  useEffect(() => {
    return () => {
      dispatch({ type: 'LOGIN_RESET' }); // reset to null to avoid unneccessary toaster
    };
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      {loginerrormsg ? toast.error(loginerrormsg) : null}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .min(4, 'Username must be at least 4 characters')
            .required('Required'),
          password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Required'),
        })}
        onSubmit={(values) => {
          dispatch(login(values, navigate));
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
            <h1>Login</h1>

            <label htmlFor="email">
              <b>UserName</b>
            </label>
            <Field name="email" type="text" />
            <span className="text-danger">
              <ErrorMessage name="email" />
            </span>
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <Field
              name="password"
              type="password"
              style={{ margin: '0% 0% 2% 0%' }}
            />
            <span className="text-danger">
              <ErrorMessage name="password" />
            </span>
            <button type="submit" className="btn btn-danger">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
      <br></br>
      <Footer />
    </div>
  );
};

export default Login;
