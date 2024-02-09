import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const NotFound = () => (
  <div>
    <NavBar />
    <h1>Error 404</h1>
    <h2>Page Not Found</h2>
    <Link to="/Home">Go Back to Home</Link>
  </div>
);
export default NotFound;
