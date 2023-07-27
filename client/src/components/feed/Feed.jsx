import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
//Destructure Posts and import such from the test data file for testing
import { Posts } from "../../dummyData"

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* Add Share component for the feed */}
        <Share/>
        {/* Map the posts in order for users to see such posts */}
        {Posts.map(post => (
          <Post key={post.id} post={post}/>
        ))}
        <Post/>
      </div>
    </div>
  )
}

