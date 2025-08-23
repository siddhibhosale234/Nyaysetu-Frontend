import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { baseBookURL } from "../axios";

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
    <div>
      <h2>Reset Password</h2>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
      {step === 1 ? (
        <button onClick={handleVerify}>Verify Code</button>
      ) : (
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Set Password</button>
        </form>
      )}
    </div>
  );
}
