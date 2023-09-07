import { useContext } from "react";
import Edit from "./pages/Edit/Edit"
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Messenger from "./pages/Messenger/Messenger";
import EditPost from "./pages/EditPost/EditPost";
import DeletePost from "./pages/DeletePost/DeletePost";
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

  const { user } = useContext(AuthContext);
  return (
    // Create routes for each page's components
    <Router>
      <Routes>
        {/* Homepage Route */}
        <Route path="/" element={user ? <Home/> : <Register/>}/>
        {/* Login Page Route */}
        <Route path="/login" element={user ? <Navigate replace to="/"/> : <Login/>}/>
        {/* Register Page Route */}
        <Route path="/register" element={user ? <Navigate replace to="/"/> : <Register/>}/>
        {/* Messenger Page Route */}
        <Route path="/messenger" element={!user ? <Navigate replace to="/"/> : <Messenger/>}/>
        {/* Profile Page Route */}
        <Route path="/profile/:username" element={<Profile/>}/>
        {/* Edit Profile Page Route */}
        <Route path="/profile/:username/edit" element={<Edit/>}/>
        {/* Edit Post Route */}
        <Route path="/post/:username/:postId/edit" element={<EditPost/>}/>
        {/* Delete Post Route */}
        <Route path="/post/:username/:postId/delete" element={<DeletePost/>}/>
      </Routes>
    </Router>
  );
}

export default App;
