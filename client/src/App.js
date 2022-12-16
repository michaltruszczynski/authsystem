import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
         </Route>
      </Routes>
   );
}

export default App;
