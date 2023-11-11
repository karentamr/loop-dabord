import React from "react";
import {useHistory } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import LooperContextProvider from "./components/context/LooperContextProvider";
import UserContextProvider from "./components/context/UserContextProvider";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-8s5j37fer35n3ln5.us.auth0.com"
      clientId="xpM9bL5QknSbHdRQeaWVed57E5ZLania"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <UserContextProvider>
      <LooperContextProvider>
        <App />
      </LooperContextProvider>
      </UserContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
