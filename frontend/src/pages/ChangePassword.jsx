import React, { useState } from "react";
import api from "../api/api";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("New passwords do not match");
    }

    try {
      const res = await api.put("/auth/change-password", {
        oldPassword,
        newPassword,
        confirmPassword
      });

      alert("Password changed successfully!");
      window.location.href = "/movies";
      
    } catch (err) {
      alert(err?.response?.data?.msg || "Failed to change password");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 450, margin: "0 auto" }}>
        <h2>Change Password</h2>

        <form onSubmit={submit}>
          <div className="form-row">
            <label>Old Password</label>
            <input 
              type="password" 
              className="input" 
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>New Password</label>
            <input 
              type="password" 
              className="input" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Confirm New Password</label>
            <input 
              type="password" 
              className="input" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="button primary" type="submit">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}
