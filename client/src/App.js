import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage/SignupPage";
import Admin from "./pages/Admin/Admin";
import Editor from "./pages/Editor/Editor";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import UserList from "./pages/UserList/UserList";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import EditUser from "./pages/EditUser/EditUser";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

function App() {
   return (
      <Routes>
         <Route path="/*" element={<Layout />}>
            <Route element={<PersistLogin />}>
               <Route index element={<Home />} />
               <Route path="login" element={<LoginPage />} />
               <Route path="signup" element={<SignupPage />} />
               <Route path="resetpassword" element={<ResetPassword />} />
               <Route path="changepassword" element={<ChangePassword />} />
               <Route path="unauthorized" element={<Unauthorized />} />

               <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]} />}>
                  <Route path="userlist" element={<UserList />} />
               </Route>

               <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.User]} />}>
                  <Route path="edituser/:id" element={<EditUser />} />
               </Route>

               <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                  <Route path="editor" element={<Editor />} />
               </Route>

               <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="admin" element={<Admin />} />
               </Route>
            </Route>
         </Route>
      </Routes>
   );
}

export default App;
