import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import "./GoogleAuth.css";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async googleResponse =>
      navigate("/result", {
        state: {
          type: "auth",
          token: googleResponse.access_token,
        },
      }),
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  });

  return (
    <div className="auth-container">
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default GoogleAuth;
