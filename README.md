# eComerce store -  The Water Sport Center
MERN stack project. Authentication system which can be embedded in any single page appplication which requires such functionality.
This singel page application allows users:
- to register with own email and password or with google account,
- to sign in using credentials or google account,
- to manage user roles (user, editor, aministrator).

## Demo
This application is deployed on Render: https://authsystem-tske.onrender.com

I encourage you to visit this web application and test it.
Please note that if you register with google then you are allowed to sign in only with google credentials.
Every user that register receives user role. For testing purposes every user can change its own role.
Depending on role user has access to different resources. Menu of the application will change based on role to allow access to specific resources.
User role is basic. Editor can access user and also additional resources. Administrator can acccess all resources.

To change role go to User List page. Select user and edit role.
For confidential reasons name, email of othes users are hidden.

## Technology
Project is created with:</br>
**Client:** React, RTK Query, Redux Thunk, React Router, Sass

**Server:** Node, Express, MongoDB, Mongoose

## Main Features
* User cathegories:
    * user,
    * Editor,
    * administrator


 * Functionality
    A user can browse through pages and change its role.

## Install Dependencies (frontend & backend)
Fontend:</br>
cd client</br>
npm install</br>

Backend:</br>
cd server</br>
npm install</br>

## Run frontend (:3000) & backend (:3500)
cd eshop
npm run dev

## Environment variables
Frontend:
REACT_APP_GOOGLE_OAUTH_CLIENT_ID
REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET
REACT_APP_GOOGLE_OAUTH_ENDPOINT
REACT_APP_GOOGLE_OAUTH_REDIRECT
REACT_APP_API

Backend:
ACCESS_TOKEN_SECRET
REFRESH_TOKEN_SECRET
DATABASE_URI
GOOGLE_OAUTH_CLIENT_ID
GOOGLE_OAUTH_CLIENT_SECRET
GOOGLE_OAUTH_REDIRECT_URL
CLIENT_ORIGIN