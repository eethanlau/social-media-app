import "./online.css"

//Pass in prop for component to display each friend and their respective information
export default function Online({ user }) {
  return (
    <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={user?.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user?.username}</span>
          </li>
  )
}
