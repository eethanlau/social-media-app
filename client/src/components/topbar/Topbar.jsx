import "./topbar.css"
import SearchIcon from "@mui/icons-material/Search"
import Person from "@mui/icons-material/Person"
import Chat from "@mui/icons-material/Chat"
import Notifications from "@mui/icons-material/Notifications"
import { Link } from "react-router-dom"

export default function Topbar() {
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
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg" />
      </div>
    </div>
  )
}