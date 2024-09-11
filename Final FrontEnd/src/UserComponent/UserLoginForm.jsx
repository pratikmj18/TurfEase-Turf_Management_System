import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../style/Userlogin.css';

const UserLoginForm = () => {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          console.log(res);

          if (res.success) {
            if (res.jwtToken !== null) {
              if (res.user.role === "admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.user.jwtToken);
              } else if (res.user.role === "customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem(
                  "customer-jwtToken",
                  res.user.jwtToken
                );
              }
            }

            if (res.jwtToken !== null) {
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
                navigate("/home"); // Redirect using react-router-dom's navigate
              }, 2000); // Redirect after 2 seconds
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    e.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="card form-card" style={{ width: "25rem" }}>
        <div className="card-header text-black text-center">
          <h4 className="card-title">Login</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                <b>Role</b>
              </label>
              <select
                onChange={handleUserInput}
                className="form-select"
                name="role"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="emailId" className="form-label">
                <b>Email Id</b>
              </label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={loginRequest.emailId}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <b>Password</b>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={loginRequest.password}
                autoComplete="on"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              onClick={loginAction}
            >
              Login
            </button>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;