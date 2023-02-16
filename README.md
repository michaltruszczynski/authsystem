# AuthSystem
MERN stack project. Authentication and authorization system which can be embedded in any single page appplication which requires such functionality.
System allows users:
- to register with own email and password or with google account,
- to sign in using credentials or google account,
- to manage user roles (user, editor, aministrator).

## Demo
This application is deployed on Render: https://authsystem-tske.onrender.com

I encourage you to visit this web application and test it.
Please note that if you register with google then you are only allowed to sign in with google credentials.
Every user that register receives user role. For testing purposes every user can change its own role.
Depending on role user has access to different resources. Menu of the application will change based on role to allow access to specific resources.
User role is basic. Editor can access user and also additional resources. Administrator can acccess all resources.

To change role go to -> User List. View user details and edit role.
For confidential reasons name, email of othes users are hidden.

## Technology
Project is created with:</br>
**Client:**</br>
React, RTK Query, Redux Thunk, React Router, Sass

**Server:**</br>
Node, Express, MongoDB, Mongoose

## Main Features
 * Functionality
    * Manage user role.

* User cathegories:
    * user,
    * editor,
    * administrator

* Inplementation
    * JWT Authentication and Authorization Flow with React and Redux Toolkit.
    * Access token is stored in Redux state. Every query to API is send togheter with authentication header which containes token.
    * If token expires, RTK Query middleware asks for new token using refresh token.
    * Refresh token (with longer expiry date) is sent using httpOnly, secure cookie.

## Install Dependencies (frontend & backend)
Fontend:</br>
cd client</br>
npm install</br>

Backend:</br>
cd server</br>
npm install</br>

## Run frontend (:3000) & backend (:3500)
cd eshop</br>
npm run dev</br>

## Setup - environment variables
Frontend:</br>
REACT_APP_GOOGLE_OAUTH_CLIENT_ID</br>
REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET</br>
REACT_APP_GOOGLE_OAUTH_ENDPOINT</br>
REACT_APP_GOOGLE_OAUTH_REDIRECT</br>
REACT_APP_API</br>

Backend:</br>
ACCESS_TOKEN_SECRET</br>
REFRESH_TOKEN_SECRET</br>
DATABASE_URI</br>
GOOGLE_OAUTH_CLIENT_ID</br>
GOOGLE_OAUTH_CLIENT_SECRET</br>
GOOGLE_OAUTH_REDIRECT_URL</br>
CLIENT_ORIGIN</br>

