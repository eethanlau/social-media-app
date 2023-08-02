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
} from "react-router-dom";

function App() {
  return (
    // Create routes for each page's components
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={<Home/>}/>
        {/* Login Page Route */}
        <Route path="/login" element={<Login/>}/>
        {/* Register Page Route */}
        <Route path="/register" element={<Register/>}/>
        {/* Profile Page Route */}
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
