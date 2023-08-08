import './share.css'
import PermMedia from "@mui/icons-material/PermMedia"
import Label from "@mui/icons-material/Label"
import Room from "@mui/icons-material/Room"
import EmojiEmotions from "@mui/icons-material/EmojiEmotions"
import Cancel from "@mui/icons-material/Cancel"
import { useState, useContext, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef()
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data)
        .then((res) => 
        console.log(res.data))
      .catch(err => 
        console.log(err)
      );
      } catch (err) {
        console.log(err);
      }
    };

    try {
      await axios.post("/posts", newPost)
      .then((res) => 
        console.log(res.data))
      .catch(err => 
        console.log(err)
      );
      // Refreshes the page after adding a new post from a user
      window.location.reload();
    } catch (err) {
    }
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
          <input placeholder={"What's on your mind " + user.username + "?"} className="shareInput" ref={desc}/>
        </div>
        <hr className='shareHr'/>
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label htmlFor="file" className="shareOption">
                <PermMedia htmlColor="blue" className='shareIcon'/>
                <span className='shareOptionText'>Photos or Videos</span>
                {/* Only allow for submission of one file at a time */}
                <input style={{display: "none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])}/>
              </label>
              <div className="shareOption">
                <Label htmlColor="green" className='shareIcon'/>
                <span className='shareOptionText'>Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="red" className='shareIcon'/>
                <span className='shareOptionText'>Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className='shareIcon'/>
                <span className='shareOptionText'>Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="">Share</button>
        </form>
      </div>
    </div>
  )
}
