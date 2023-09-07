import { useRef, useContext } from "react";
import axios from "axios";
//Used to format the creation date for a post made by a user
import { format } from "timeago.js"
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from "../../components/topbar/Topbar";
import ArrowBack from "@mui/icons-material/ArrowBack";

export default function DeletePost({ post }) {
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const navigate = useNavigate();
  const postId = useParams().postId;

  //Handle deletion of a post accordingly
  const handleClick = async (e) => {
    e.preventDefault();
    const requestData = {
      data: { userId }, // This is the request body containing the userId
    };
    
    try {
      // Need to have appropriate permissions to do so
      await axios.delete("/posts/" + postId, requestData)
      .then((res) => 
      navigate("/"))
      .catch(err => 
        console.log(err)
      );
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="delete">
      <Topbar/>
      <h1 class="text-center mt-5">Delete Post</h1>
      <div className="row">
      <div class="col-6 offset-3">
      <h5 class="mt-3">
          <Link to={"/profile/" + user.username}>
            <a><ArrowBack/>Back to Profile</a>
          </Link>
        </h5>
        <form onSubmit={handleClick}>
          {/* Allow for a yes or no option: If the user clicks "yes", delete the post accordingly. Otherwise, if the user clicks "no", redirect back to their profile page */}

          <div class="mb-4 container">
            <div class="row">
              <button class="btn btn-danger" type="submit">Are you sure you want to delete this post?</button>
            </div>
        </div>
        </form>
        </div>
      </div>
    </div>
  )
}
