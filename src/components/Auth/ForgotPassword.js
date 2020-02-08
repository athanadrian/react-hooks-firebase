import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  const handleChange = e => {
    setResetPasswordEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordReset(true);
      setPasswordResetError(null);
    } catch (error) {
      console.log("Error reseting password:", error);
      setPasswordResetError(error.message);
      setIsPasswordReset(false);
    }
  };
  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email."
        onChange={handleChange}
      />
      <div>
        <button type="submit" className="button" onClick={handleResetPassword}>
          Reset password
        </button>
      </div>
      {isPasswordReset && <p>Check your email to reset password!</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
