import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseBookURL } from "../axios";
import './ResetPassword.css';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const role = searchParams.get("role");

  const [step, setStep] = useState(1);
  const [newPassword, setNewPassword] = useState("");

  const handleVerify = async () => {
    try {
      const { data } = await baseBookURL.post("/forgotPassword/verifyCode", {
        Email: email,
        Code: code,
        Role: role,
      });
      if (data.Success) {
        alert("Code verified, now set a new password");
        setStep(2);
      } else {
        alert(data.Message);
      }
    } catch (err) {
      alert("Verification failed");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await baseBookURL.post("/forgotPassword/resetPassword", {
        Email: email,
        newPassword,
        Role: role,
      });
      if (data.Success) {
        alert("Password reset successful! Please login.");
        window.location.href = `/login?role=${role}`;
      } else {
        alert(data.Message);
      }
    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="resetpass-body">
      <div className="resetpass-container">
        <h2 className="resetpass-title">Reset Password</h2>
        <p className="resetpass-info">Email: {email}</p>
        <p className="resetpass-info">Role: {role}</p>

        {step === 1 ? (
          <button className="resetpass-btn" onClick={handleVerify}>
            Verify Code
          </button>
        ) : (
          <form className="resetpass-form" onSubmit={handleReset}>
            <input
              type="password"
              className="resetpass-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="resetpass-btn">
              Set Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
