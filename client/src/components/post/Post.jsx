import "./post.css"
import MoreVert from "@mui/icons-material/MoreVert"

export default function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        {/* Organize post layout accordingly */}
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src="/assets/person/1.jpeg" alt="" />
            <span className="postUsername">Jake Johns</span>
            <span className="postDate">5 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">Hey! Its my first post :)</span>
          <img className="postImg" src="assets/post/1.jpeg" alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="" />
            <img className="likeIcon" src="assets/heart.png" alt="" />
            <span className="postLikeCounter">18 likes</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">8 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
