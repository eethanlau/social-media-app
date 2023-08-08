import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
//Destructure Posts and import such from the test data file for testing
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//Pass in username prop to display feed
export default function Feed({ username }) {
  //UseState for rendering the posts
  const [posts, setPosts] = useState([]);
  // Use Auth context for authenticating the user properly
  const { user } = useContext(AuthContext);

  //Set the posts that the user may view appropriately
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username 
      ? await axios.get("/posts/profile/" + username) 
      .then((res) => 
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })))
      .catch(err => 
        console.log(err)
      )
      : await axios.get("/posts/timeline/" + user._id)
      .then((res) => 
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })))
      .catch(err => 
        console.log(err)
      )
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* Add Share component for the feed */}
        {/* Only when you click on your own profile, should you be able to share posts from that profile */}
        {(!username || username === user.username) && <Share/>}
        {/* Map the posts in order for users to see such posts */}
        {posts.map(post => (
          <Post key={post._id} post={post}/>
        ))}
      </div>
    </div>
  )
}

