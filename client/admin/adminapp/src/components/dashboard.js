import Navbar from './navbar';
import Login from './login';
const Dashboard = () => {
  const token = localStorage.getItem('token');
  return token ? (
    <>
      <div>
        <Navbar />
        <h1>Admin dashboard</h1>
      </div>
    </>
  ) : (
    <Login />
  );
};
export default Dashboard;
