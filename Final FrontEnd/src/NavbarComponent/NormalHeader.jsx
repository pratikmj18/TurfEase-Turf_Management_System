import { Link } from "react-router-dom";

const NormalHeader = () => {
  return (

    
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">

<li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page">
          <b className="text-white">Home</b>
        </Link>
      </li>
      
      <li className="nav-item">
        <Link to="/user/customer/register" className="nav-link active" aria-current="page">
          <b className="text-white">Register </b>
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/login" className="nav-link active" aria-current="page">
          <b className="text-white">Login</b>
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;
