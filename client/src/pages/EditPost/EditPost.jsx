import "./editPost.css"
import { useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Topbar from "../../components/topbar/Topbar";
import ArrowBack from "@mui/icons-material/ArrowBack";

// Component that allows users to edit their post accordingly
export default function EditPost({ post }) {
  //Pass in the context API accordingly
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const desc = useRef();
  const navigate = useNavigate();
  //Retrieve the postId accordingly of the post we are editing specifically
  const postId = useParams().postId;

  const handleClick = async (e) => {
    e.preventDefault();
    const post = {
      userId : userId,
      desc: desc.current.value,
    }
    console.log(postId);
    //Utilize axios to make a request to the API to push in the edited information for the post accordingly
    try {
      await axios.put("/posts/" + postId, post)
      .then((res) => 
      navigate("/"))
      .catch(err => 
        console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className="updatePost">
      <Topbar/>
      <h1 class="text-center mt-5">Edit Post Information</h1>
      <div className="row">
      <div class="col-6 offset-3">
      <h5 class="mt-3">
          <Link to={"/profile/" + user.username}>
            <a><ArrowBack/>Back to Profile</a>
          </Link>
        </h5>
        <form onSubmit={handleClick}>
          {/* Description */}
          <div class="mb-4 mt-4">
            <label class="form-label" for="description">Description:</label>
            <input
              class="form-control"
              type="text"
              id="description"
              ref={desc}
            />
          </div>
          <div class="mb-4 container">
            <div class="row">
              <button class="btn btn-primary" type="submit">Update Post Information</button>
            </div>
        </div>
        </form>
      </div>
      </div>
    </div>
  )
}
