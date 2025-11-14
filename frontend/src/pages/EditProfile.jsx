import React, { useState, useEffect } from "react";
import api from "../api/api";
import { setTokenLocal } from "../utils/auth";
import { setToken } from "../api/api";

export default function EditProfile({ user, setUser }) {
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/auth/update", {
        username,
        email,
        password: password ? password : undefined
      });

      const { token, user: updatedUser } = res.data;

      // update token + user in frontend
      setTokenLocal(token);
      setToken(token);
      setUser(updatedUser);

      alert("Profile updated!");
      window.location.href = "/movies";
    } catch (err) {
      alert(err?.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 500, margin: "0 auto" }}>
        <h2>Edit Profile</h2>

        <form onSubmit={submit}>
          <div className="form-row">
            <label>Username</label>
            <input 
              className="input" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
            />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input 
              className="input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-row">
            <label>New Password (optional)</label>
            <input 
              className="input" 
              type="password"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          <button className="btn primary" type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
