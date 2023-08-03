import { useContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import {
  BrowserRouter as Router,
  RouterProvider,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {

  const { user } = useContext(AuthContext)
  return (
    // Create routes for each page's components
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={user ? <Home/> : <Register/>}/>
        {/* Login Page Route */}
        <Route path="/login" element={user ? <Navigate replace to="/"/> : <Login/>}/>
        {/* Register Page Route */}
        <Route path="/register" element={<Register/>}/>
        {/* Profile Page Route */}
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
