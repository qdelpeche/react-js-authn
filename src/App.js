import React, { useEffect, useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import './App.css';

function App() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [claims, setClaims] = useState(null);

  const login = () => instance.loginRedirect();
  const logout = () => instance.logoutRedirect();

  // Set active account when accounts are available
  useEffect(() => {
    if (accounts.length > 0) {
      instance.setActiveAccount(accounts[0]); // Set the first account as active
    }
  }, [accounts, instance]);

  useEffect(() => {
    const fetchToken = async () => {
      if (isAuthenticated) {  // Only attempt to acquire token if authenticated
        try {
          const response = await instance.acquireTokenSilent({
            scopes: ["openid", "profile", "User.Read"], // Ensure these scopes are granted
          });
          setClaims(response.idTokenClaims); // Set claims to state
          console.log("ID Token Claims:", response.idTokenClaims); // Log claims to console
        } catch (error) {
          console.error("Error acquiring token silently:", error);
        }
      }
    };
    fetchToken();
  }, [instance, isAuthenticated]); // Run only when authenticated

  return (
      <div className="App">
        <UnauthenticatedTemplate>
          <h2>Welcome guest, you are not logged in!</h2>
          <button onClick={login}>Sign in</button>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <h2>Welcome {claims?.name || claims?.preferred_username || "User"}, you are logged in!</h2>
          <button onClick={logout}>Sign out</button>
          <ul>
            {claims &&
                Object.entries(claims).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value.toString()}
                    </li>
                ))}
          </ul>
        </AuthenticatedTemplate>
        <hr/>
        <ul>
          <li><a href="https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react/">React single-page application using MSAL React to authenticate users against Microsoft Entra External ID</a></li>
          <li><a href="https://learn.microsoft.com/en-us/entra/external-id/customers/tutorial-single-page-app-react-sign-in-configure-authentication">Tutorial: Handle authentication flows in a React SPA</a></li>
          <li><a href="https://blog.logrocket.com/using-msal-react-authentication/">Using msal-react for React app authentication</a></li>
          <li><a href="https://learn.microsoft.com/en-us/entra/external-id/customers/sample-single-page-app-react-sign-in">Sign in users in a sample React single-page app (SPA)</a></li>
        </ul>
      </div>
  );
}

export default App;
