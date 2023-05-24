import { Link } from 'react-router-dom';

const Navbar = () => {
  const navbarStyle = {
    backgroundImage: 'linear-gradient(to right, #4B0082, #8A2BE2)',
    color: '#FFF',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
    fontFamily: 'Arial, sans-serif',
  };

  return (
    <div>
      <nav class="navbar navbar-default" style={navbarStyle}>
        <div class="container-fluid">
          <div class="navbar-header">
            <Link to="/" className="navbar-brand">
              <b> Health Track </b>
            </Link>
          </div>
          <ul class="nav navbar-nav">
            <li>
              <Link to="/verify" className="navbar-brand">
                Verify
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="navbar-brand">
                Contact Us
              </Link>
            </li>
            <li>
              <a className="navbar-brand" href="http://localhost:3001/">
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
