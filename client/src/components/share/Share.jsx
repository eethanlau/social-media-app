import './share.css'
import PermMedia from "@mui/icons-material/PermMedia"
import Label from "@mui/icons-material/Label"
import Room from "@mui/icons-material/Room"
import EmojiEmotions from "@mui/icons-material/EmojiEmotions"

export default function Share() {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src="/assets/person/1.jpeg" alt="" />
          <input placeholder="What's in your mind?" className="shareInput" />
        </div>
        <hr className='shareHr'/>
        <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <PermMedia htmlColor="blue" className='shareIcon'/>
                <span className='shareOptionText'>Photos or Videos</span>
              </div>
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
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  )
}
