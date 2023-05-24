import { Link } from 'react-router-dom';
import { logout } from '../action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbarStyle = {
    backgroundImage: 'linear-gradient(to right, #4B0082, #8A2BE2)',
    color: '#FFF',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial, sans-serif',
  };
  const out = () => {
    dispatch(logout());
    navigate('/');
  };
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div>
      <nav class="navbar navbar-default" style={navbarStyle}>
        <div class="container-fluid">
          <div class="navbar-header">
            {token && role === 'Patient' ? (
              <Link to="/pdashboard" className="navbar-brand">
                <b> Health Track </b>
              </Link>
            ) : role === 'Admin' ? (
              <Link to="/dash" className="navbar-brand">
                <b> Health Track </b>
              </Link>
            ) : (
              <a className="navbar-brand" href="http://localhost:3000/">
                <b> Health Track </b>
              </a>
            )}
          </div>
          <ul class="nav navbar-nav">
            {!token && (
              <li>
                <Link to="/signup" className="navbar-brand">
                  Sign Up
                </Link>
              </li>
            )}
            {token && role === 'Patient' && (
              <li>
                {' '}
                <Link to="/listconsultation" className="navbar-brand">
                  Consultation{' '}
                </Link>
              </li>
            )}
            {token && role === 'Patient' && (
              <li>
                {' '}
                <Link to="/pdash" className="navbar-brand">
                  Profile{' '}
                </Link>
              </li>
            )}
            {token && role === 'Admin' && (
              <li>
                {' '}
                <Link to="/transactionhistory" className="navbar-brand">
                  Transaction History{' '}
                </Link>
              </li>
            )}
            {token && role === 'Admin' && (
              <li>
                {' '}
                <Link to="/adminlistconsultations" className="navbar-brand">
                  List of Consultations{' '}
                </Link>
              </li>
            )}
            {token && role === 'Admin' && (
              <li>
                {' '}
                <Link to="/adminlistvaccinations" className="navbar-brand">
                  List of Vaccinations{' '}
                </Link>
              </li>
            )}
            {token && role === 'Admin' && (
              <li>
                {' '}
                <Link to="/feedback" className="navbar-brand">
                  Feedbacks{' '}
                </Link>
              </li>
            )}
            {token && role === 'Patient' && (
              <li>
                {' '}
                <Link to="/medical" className="navbar-brand">
                  Add/ Edit Profile Information{' '}
                </Link>
              </li>
            )}
            {token && role === 'Patient' && (
              <li>
                {' '}
                <Link to="/listvaccinations" className="navbar-brand">
                  Vaccination{' '}
                </Link>
              </li>
            )}
            {token && (
              <li className="navbar-brand">
                <button
                  className="nav-link btn btn-danger"
                  onClick={() => out()}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
