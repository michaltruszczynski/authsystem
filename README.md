# AuthSystem
MERN stack project. Authentication and authorization system which can be embedded in any single page application which requires such functionality.
System allows users:
- to register with own email and password or with **google account**,
- to sign in using credentials or **google account**,
- to manage user roles (user, editor, administrator),
- to reset password using email send by **SendGrid**.

## Demo
This application is deployed on Render: https://authsystem-tske.onrender.com

I encourage you to visit this web application and test it.
Please note that if you register with google then you are only allowed to sign in with google credentials.
Every user that register receives user role. For testing purposes every user can change its own role.
Depending on role user has access to different resources. Menu of the application will change based on role to allow access to specific resources.
User role is basic. Editor can access user and also additional resources. Administrator can access all resources.

To change role go to -> User List. View user details and edit role.
For confidential reasons name, email of others users are hidden.

Reset password process is designed with reset email send using SendGrid. Please note that emails send via SendGrid may be treated as span. Therefore while testing this functionality check your your spam folder.

## Technology
Project is created with:</br>
**Client:**</br>
React, RTK Query, Redux Thunk, React Router, Sass

**Server:**</br>
Node, Express, MongoDB, Mongoose
Connects to: SendGrid, GoogleAPI

## Main Features
 * Functionality
    * Manage user role.

* User categories:
    * user,
    * editor,
    * administrator

* Implementation
    * JWT authentication and authorization flow with React and Redux Toolkit.
    * Access token is stored in Redux state. Every query to API is send together with authentication header which contains token.
    * If token expires, RTK Query middleware asks for new access token using refresh token.
    * Refresh token (with longer expiry date) is sent using httpOnly, secure cookie.
    * Refresh token can be used once. If refresh token is used used twice or is incorrect all refresh token are invalidated.

* Reset password:
    * User submits request to reset password.
    * If user exists email with link to change password form is send. Link contains token and user id as query params.
    * User submits new password. Backend checks credentials (token) and validate password. If no errors, password is changed.

* Both frontend and backend data validation is implemented.

## Install Dependencies (frontend & backend)
Frontend:</br>
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
SENDGRID_API_KEY</br>
SENDGRID_SENDER</br>
