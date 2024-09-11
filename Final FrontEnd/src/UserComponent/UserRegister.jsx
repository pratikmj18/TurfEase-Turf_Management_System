//UserRegister.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/UserRegister.css"; // Import the new CSS file

const UserRegister = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    contact: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
    age: "",
    sex: "",
  });

  const navigate = useNavigate();

  if (document.URL.indexOf("admin") != -1) {
    user.role = "admin";
  } else if (document.URL.indexOf("customer") != -1) {
    user.role = "customer";
  }

  console.log("ROLE FECTHED : " + user.role);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [genders, setGenders] = useState([]);

  const retrieveAllGenders = async () => {
    const response = await axios.get("http://localhost:8080/api/user/gender");
    return response.data;
  };

  useEffect(() => {
    const getAllGenders = async () => {
      const allGenders = await retrieveAllGenders();
      if (allGenders) {
        setGenders(allGenders.genders);
      }
    };

    getAllGenders();
  }, []);

  const saveUser = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((result) => {
      console.log("result", result);
      result.json().then((res) => {
        console.log(res);

        if (res.success) {
          console.log("Got the success response");

          toast.success(res.responseMessage, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/user/login");
          }, 1000); // Redirect after 3 seconds
        } else {
          console.log("Didn't got success response");
          toast.error("It seems server is down", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 1000); // Redirect after 3 seconds
        }
      });
    });
  };

  return (
    <div className="register-container">
      <div className="card form-card" style={{ maxWidth: '800px' }}>

        <div className="card-header">
          <h5 className="card-title">Register {user.role}</h5>
        </div>
        <div className="card-body">
          <form className="form-grid" onSubmit={saveUser}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                onChange={handleUserInput}
                value={user.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                onChange={handleUserInput}
                value={user.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailId">Email Id</label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={user.emailId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={user.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sex">User  Gender</label>
              <select
                onChange={handleUserInput}
                className="form-control"
                name="sex"
              >
                <option value="0">Select Gender</option>
                {genders.map((gender) => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact No</label>
              <input
                type="number"
                className="form-control"
                id="contact"
                name="contact"
                onChange={handleUserInput}
                value={user.contact}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                onChange={handleUserInput}
                value={user.age}
              />
            </div>
            <div className="form-group">
              <label htmlFor="street">Street</label>
              <textarea
                className="form-control"
                id="street"
                name="street"
                rows="3"
                onChange={handleUserInput}
                value={user.street}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                onChange={handleUserInput}
                value={user.city}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                className="form-control"
                id="pincode"
                name="pincode"
                onChange={handleUserInput}
                value={user.pincode}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn submit-btn">
                Register User
              </button>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;