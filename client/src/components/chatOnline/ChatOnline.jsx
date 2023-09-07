import axios from "axios";
import { useState, useEffect } from "react";
import "./chatOnline.css"

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
  //Display user information of online users accordingly
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("/users/friends/" + currentId)
        setFriends(res.data);
      //   .then(res => setFriends(res.data))
      // .catch(res => console.log(res));
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentId]);

  console.log(friends);
  
  useEffect(() => {
    setOnlineFriends(friends.filter(friend => 
      onlineUsers.includes(friend._id)
    ));
  },[friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map(online => (
        <div className="chatOnlineFriend" onClick={()=> handleClick(online)}>
        <div className="chatOnlineImgContainer">
        <img
          className="chatOnlineImg"
          src={online?.profilePicture ? PF + online?.profilePicture : PF + "person/noAvatar.png"}
          alt=""
        />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{online?.username}</span>
      </div>
      ))}
    </div>
  )
}
