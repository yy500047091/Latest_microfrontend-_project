// host-app/src/Login.tsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roleError, setRoleError] = useState("");

  const validateForm = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");
    setRoleError("");

    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (role !== "user" && role !== "admin" && role !== "guest") {
      setRoleError("Invalid role");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("userRole", role);
      // alert(`Logged in as: ${username} (Role: ${role})`);
      navigate('/dashboard');
    }
  };

  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", 
    padding: "20px",
    overflow: "hidden", // To contain potential background animations
  }}
>
      <style>
        {`
          @keyframes subtleBackgroundMotion {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(1); opacity: 0.9; }
          }

          .login-container {
            animation: subtleBackgroundMotion 10s infinite alternate;
          }
        `}
      </style>
      <div
        className="login-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background for the form
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
          width: "400px",
          maxWidth: "100%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#007bff", fontWeight: "500" }}>
          Account Login
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label htmlFor="username" style={{ display: "block", marginBottom: "8px", color: "#495057", fontWeight: "600" }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: usernameError ? "1px solid #dc3545" : "1px solid #ced4da",
                width: "100%",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
            {usernameError && <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>{usernameError}</div>}
          </div>

          <div>
            <label htmlFor="password" style={{ display: "block", marginBottom: "8px", color: "#495057", fontWeight: "600" }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: passwordError ? "1px solid #dc3545" : "1px solid #ced4da",
                width: "100%",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
            {passwordError && <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>{passwordError}</div>}
          </div>

          <div>
            <label htmlFor="role" style={{ display: "block", marginBottom: "8px", color: "#495057", fontWeight: "600" }}>
              User Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: roleError ? "1px solid #dc3545" : "1px solid #ced4da",
                width: "100%",
                fontSize: "16px",
                boxSizing: "border-box",
                cursor: "pointer",
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
            {roleError && <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>{roleError}</div>}
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.2s ease-in-out",
              width: "100%",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;