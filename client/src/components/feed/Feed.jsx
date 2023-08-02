import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
//Destructure Posts and import such from the test data file for testing
import { useState, useEffect} from "react";
import axios from "axios";

//Pass in username prop to display feed
export default function Feed({ username }) {
  //UseState for rendering the posts
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
      ? await axios.get("/posts/profile/" + username) 
      .then((res) => 
        setPosts(res.data))
      .catch(err => 
        console.log(err)
      )
      : await axios.get("posts/timeline/64c17f80893bb3721eb07068")
      .then((res) => 
        setPosts(res.data))
      .catch(err => 
        console.log(err)
      )
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* Add Share component for the feed */}
        <Share/>
        {/* Map the posts in order for users to see such posts */}
        {posts.map(post => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}

