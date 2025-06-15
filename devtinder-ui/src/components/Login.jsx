import { useState } from "react";
import axios from "axios";
import { setUser, clearUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(response.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data || "Login failed");
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="py-3">
            <div className="mt-3">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Email ID:</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs mt-3"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  value={password}
                  className="input input-bordered w-full max-w-xs mt-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          {error && (
            <div className="alert alert-error shadow-lg mt-3">
              <div>
                <span>{error}</span>
              </div>
            </div>
          )}
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
