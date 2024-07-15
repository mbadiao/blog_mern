import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { register } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    try {
      const response = await fetch(register, {
        method: "POST",
        body: JSON.stringify({ firstname, lastname, username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error while fetching data");
        return;
      }
      const data = await response.json();
      setUserInfo(data.data.user);
      toast.success(data.message || "Register successful");
      navigate("/");
    } catch (error) {
      toast.error("Error while trying to register");
    }
  }
  return (
    <form className="register" onSubmit={registerUser}>
      <h1>Register</h1>
      <input
        type="text"
        value={firstname}
        onChange={(event) => setFirstname(event.target.value)}
        placeholder="firstname"
      />
      <input
        type="text"
        value={lastname}
        onChange={(event) => setLastname(event.target.value)}
        placeholder="lastname"
      />
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <button>Register</button>
    </form>
  );
};

export default RegisterPage;
