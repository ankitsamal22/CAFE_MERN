import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="App-Register-Row">
      <div>
        <h2>Registration Form</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          <input
            type="text"
            placeholder="Enter First Name"
            onChange={(e) =>
              setUser({ ...user, firstName: e.target.value })
            }
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Enter Last Name"
            onChange={(e) =>
              setUser({ ...user, lastName: e.target.value })
            }
          />
        </p>
        <p>
          <input
            type="text"
            placeholder="Enter Email Address"
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </p>
        <p>
          <button onClick={handleSubmit}>Submit</button>
        </p>
        <hr />
        <Link to="/login">Already a member? Login Here...</Link>
      </div>
    </div>
  );
}
