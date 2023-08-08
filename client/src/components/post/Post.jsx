import "./post.css"
import MoreVert from "@mui/icons-material/MoreVert"
import { useState, useEffect, useContext } from "react";
import axios from "axios";
//Used to format the creation date for a post made by a user
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

//Pass in prop for post in order to access the properties of each individual post
export default function Post({ post }) {
  //Implement useState for creating like functionality for users
  const [like, setLike] = useState(post?.likes.length);
  //UseState to manage if the post has already been liked or not
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //Destructure user from AuthContext and give it a new alias
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      //Retrieve data properly
      const res = await axios.get(`/users?userId=${post.userId}`)
      .then((res) => 
        setUser(res.data))
      .catch(err => 
        console.log(err)
      );
    }
    fetchUser();
  }, [post?.userId])
  
  //Handle likes and unlikes accordingly
  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", {userId: currentUser._id})
      .then((res) => 
        console.log(res.data))
      .catch(err => 
        console.log(err)
      );
    } catch (err) {}
    setLike(isLiked ? like - 1: like + 1);
    setIsLiked(!isLiked);
  }
  
  return (
    <div className="post">
      <div className="postWrapper">
        {/* Organize post layout accordingly */}
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img className="postProfileImg" src={user.profilePicture || PF + "person/noAvatar.png"} alt="" />
            </Link>
            <span className="postUsername">{user?.username}</span>
            <span className="postDate">{format(post?.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post?.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} alt="" onClick={likeHandler}/>
            <img className="likeIcon" src={`${PF}heart.png`} alt="" onClick={likeHandler}/>
            <span className="postLikeCounter">{like} like/s</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
