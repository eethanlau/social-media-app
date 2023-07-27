import "./post.css"
import MoreVert from "@mui/icons-material/MoreVert"
import { Users } from "../../dummyData";
import { useState } from "react";

//Pass in prop for post in order to access the properties of each individual post
export default function Post({post}) {
  //Implement useState for creating like functionality for users
  const [like, setLike] = useState(post?.like);
  //UseState to manage if the post has already been liked or not
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1: like + 1);
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        {/* Organize post layout accordingly */}
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={Users.filter((u) => u.id === post?.userId)[0]?.profilePicture} alt="" />
            <span className="postUsername">{Users.filter((u) => u.id === post?.userId)[0]?.username}</span>
            <span className="postDate">{post?.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.photo} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" onClick={likeHandler}/>
            <img className="likeIcon" src="assets/heart.png" alt="" onClick={likeHandler}/>
            <span className="postLikeCounter">{like} like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
