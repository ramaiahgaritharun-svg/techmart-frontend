import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  //check email
  const checkEmail = async () => {
    if (!email) {
      toast.error("Enter email");
      return;
    }

    try {
      const res = await api.post("check-email/", { email });

      if (res.data.exists) {
        toast.success("Email found");
        setStep(2);
      } else {
        toast.error("Email not found");
      }
    } catch {
      toast.error("Server error");
    }
  };

  //reset password
  const resetPassword = async () => {
    if (!newPassword) {
      toast.error("Enter new password");
      return;
    }

    try {
      await api.post("reset-password-simple/", {
        email,
        password: newPassword,
      });

      toast.success("Password updated");
      setEmail("");
      setNewPassword("");
      setStep(1);
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Forgot Password</h3>

      {step === 1 && (
        <>
          <input
            className="form-control mt-3"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-primary mt-3 w-100" onClick={checkEmail}>
            Check Email
          </button>
        </>
      )}

      
      {step === 2 && (
        <>
          <input
            type="password"
            className="form-control mt-3"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="btn btn-success mt-3 w-100"
            onClick={resetPassword}
          >
            Update Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
