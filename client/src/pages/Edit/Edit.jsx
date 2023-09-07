import "./edit.css"
import { useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Topbar from "../../components/topbar/Topbar";
import ArrowBack from "@mui/icons-material/ArrowBack"

//Edit component for editing information on a profile appropriately
export default function Edit() {
  //Utilize useRefs in order to reference the values we intend to modify
  //Handle editing the user information appropriately
  const { user } = useContext(AuthContext);
  const userId = user._id;
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const navigate = useNavigate();
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      console.log("Passwords do not match. Please try again.")
    } else {
    // Input new user data accordingly and bundle new information accordingly
    const user = {
      //Need to somehow pass the user._id appropriately
      userId: userId,
      password : password.current.value,
      desc : desc.current.value,
      city : city.current.value,
      from : from.current.value,
      relationship : relationship.current.value
    }
    console.log(user.userId)
    try {
      //Request to edit the information properly
      await axios.put("/users/" + userId, user)
      .then((res) => 
      navigate("/"))
      .catch(err => 
        console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  }
  }

  return (
    <div className="update">
      <Topbar/>
      <h1 class="text-center mt-5">Edit Profile Information</h1>
      <div className="row">
      <div class="col-6 offset-3">
      <h5 class="mt-3">
          <Link to={"/profile/" + user.username}>
            <a><ArrowBack/>Back to Profile</a>
          </Link>
        </h5>
      <form onSubmit={handleClick}>

        {/* Password */}
        <div class="mb-4 mt-4">
            <label class="form-label" for="password">Password:</label>
            <input
              class="form-control"
              type="password"
              id="password"
              ref={password}
            />
          </div>

        {/* Confirm Password */}
        <div class="mb-4 mt-4">
          <label class="form-label" for="passwordAgain">Confirm Password:</label>
          <input
            class="form-control"
            type="password"
            id="passwordAgain"
            ref={passwordAgain}
          />
        </div>

          {/* Description */}
          <div class="mb-4">
            <label class="form-label" for="description">Description:</label>
            <textarea
              class="form-control"
              type="text"
              id="description"
              ref={desc}
              cols="10"
              rows="4"
            ></textarea>
          </div>

        {/* City */}
        <div class="mb-4 mt-4">
          <label class="form-label" for="city">City:</label>
          <input
            class="form-control"
            type="text"
            id="city"
            ref={city}
          />
        </div>

        {/* From */}
        <div class="mb-4 mt-4">
          <label class="form-label" for="from">From:</label>
          <input
            class="form-control"
            type="text"
            id="from"
            ref={from}
          />
        </div>

        {/* Relationship */}
        <div class="mb-4 mt-4">
          <label class="form-label" for="from">Relationship:</label>
          <input
            class="form-control"
            type="text"
            id="relationship"
            ref={relationship}
          />
        </div>

        {/* Password
        <input type="password" ref={password}/>
        Confirm Password
        <input type="password" ref={passwordAgain}/>
        Description
        <input type="text" ref={desc}/>
        City
        <input type="text" ref={city}/>
        From
        <input type="text" ref={from}/>
        Relationship
        <input type="text" ref={relationship}/> */}
        {/* <input type="file" />
        <input type="file" /> */}
        <div class="mb-4 container">
            <div class="row">
              <button class="btn btn-primary" type="submit">Update Profile Information</button>
            </div>
        </div>
          {/* <button className="" type="submit">
              Edit
            </button> */}

      </form>
    </div>
    </div>
    </div>
  )
}


