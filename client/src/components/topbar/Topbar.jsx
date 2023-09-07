import "./topbar.css"
import SearchIcon from "@mui/icons-material/Search"
import Person from "@mui/icons-material/Person"
import Chat from "@mui/icons-material/Chat"
import Notifications from "@mui/icons-material/Notifications"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  //Include the place where the assets are stored
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        {/* Link to head back to the Homepage based off the user's decision */}
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">UserLink</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon/>
          <input placeholder="Search for friends, posts, and videos" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to="/messenger" style={{textDecoration:"none"}}>
          <div className="topbarIconItem">
            <Chat/>
            {/* <span className="topbarIconBadge"></span> */}
          </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        {/* Profile Picture of the user */}
        <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>
    </div>
  )
}