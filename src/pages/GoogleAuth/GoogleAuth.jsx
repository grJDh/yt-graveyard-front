import { useGoogleLogin } from "@react-oauth/google";

import "./GoogleAuth.css";

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: async googleResponse => {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const serverResponse = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          type: "auth",
          token: googleResponse.access_token,
          channelID: null,
        }),
      });
      const jsonListOfSubs = await serverResponse.json();
      console.log(jsonListOfSubs);
    },
    scope: "https://www.googleapis.com/auth/youtube.readonly",
  });

  return (
    <div className="auth-container">
      <button onClick={() => login()}>Sign in with Google 🚀 </button>
    </div>
  );
};

export default GoogleAuth;
