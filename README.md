# React.js Authentication

This React.js website only supports authentication against a tenant in a Microsoft Entra ID service in Azure. This code works perfectly with the free tier of Entra ID but does not support authorization against an API endpoint.

## Setup

### Step 1: Register Your Application in Entra ID
1. Sign in to the Microsoft Entra admin center.
1. Go to Identity > Applications > App registrations and select New registration.
1. Enter a meaningful name for your app (e.g., React-SPA).
1. For Supported account types, select Accounts in this organizational directory only.
1. Under Redirect URI, choose Single-page application (SPA) and enter http://localhost:3000 (or the appropriate redirect URI for your environment).
1. Complete the registration, noting the Application (client) ID as you'll need this later.

### Step 2: Configure API Permissions and Admin Consent
1. In the app registration settings, go to API Permissions.
1. Add Microsoft Graph API permissions (e.g., openid, profile, and User.Read) to enable basic user information access.
1. Click Grant admin consent to allow the application access to these permissions for all users.

### Step 3: Configure msalConfig
1. Open authConfig.js
1. Replace <CLIENT_ID> with the Client ID from the app in Step 1.
1. Replace <TENANT_ID> with the Tenant ID from Entra ID tenant.

## Tutorials
* https://learn.microsoft.com/en-us/samples/azure-samples/ms-identity-ciam-javascript-tutorial/ms-identity-ciam-javascript-tutorial-1-sign-in-react/
* https://learn.microsoft.com/en-us/entra/external-id/customers/tutorial-single-page-app-react-sign-in-configure-authentication
* https://blog.logrocket.com/using-msal-react-authentication/
* https://learn.microsoft.com/en-us/entra/external-id/customers/sample-single-page-app-react-sign-in 

## Versions
* NPM: 10.9.0
* React.js: 18.3.1
