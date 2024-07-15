import React, { useContext, useState } from "react";
import { login } from "../routes/routes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./login.css"
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(login, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Error while logging in");
        return;
      }
      const data = await response.json();
      setUserInfo(data.data.user);
      toast.success(data.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Error while trying to log in");
    }
  };

  return (
    <div className="logincontainer">
    <form className="login" onSubmit={Login}>
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button>Login</button>
    </form>
    </div>
  );
};

export default LoginPage;
