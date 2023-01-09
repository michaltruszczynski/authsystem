import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage/SignupPage";

import Editor from "./pages/Editor/Editor";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import Admin from "./pages/Admin/Admin";
import PersistLogin from "./components/PersistLogin/PersistLogin";

const ROLES = {
   User: 2001,
   Editor: 1984,
   Admin: 5150,
};

function App() {
   return (
      <Routes>
         <Route element={<PersistLogin />}>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="editor" element={<Editor />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            
               <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path={"admin"} element={<Admin />} />
               </Route>
               <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
                  <Route path={"editor"} element={<Editor />} />
               </Route>
            
         </Route>
         </Route>
      </Routes>
   );
}

export default App;
