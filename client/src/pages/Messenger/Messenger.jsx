import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext, useEffect, useState, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";
//Implement live-chat functionality with socket.io
import { io } from "socket.io-client";

export default function Messenger() {
  //UseStates
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  //Display online users accordingly
  const [onlineUsers, setOnlineUsers] = useState([]);
  //Set the socket appropriately
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        //Message should be created at the current date accordingly
        createdAt: Date.now(),
      });
    });
  }, []);
  
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((previous) => [...previous, arrivalMessage]);
  },[arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(user.followings.filter(f => users.some(u => u.userId === f)));
    })
  }, [user]);


  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);

      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch(err) {
        console.log(err);
      }

    };
    getMessages();
  },[currentChat]);

  //Handle the post request of a new message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    //Retrieve the receiverId to emit messages through socket-io
    const receiverId = currentChat.members.find(member => member !== user._id);

    //Send the message with socket
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    })

    try {
      //Post such message
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      //Reset message to be empty afterwards
      setNewMessage("");
    } catch (err) {
      console.log(err)
    }
  };
  
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  return (
    <>
    <Topbar/>
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {/* Resolve the mapping of the messages */}
          {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user}/>
              </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          { currentChat ? (
          <>
          
          <div className="chatBoxTop">
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Message message={m} own={m.sender === user._id}/>
              </div>
            ))}
          </div>
          <div className="chatBoxBottom">
            <textarea className="chatMessageInput" placeholder="Start typing here..." onChange={(e) =>setNewMessage(e.target.value)} value={newMessage}></textarea>
            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
          </div></>) : (<span className="noConversationText">Please open a conversation to begin messaging.</span>) }
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
        </div>
      </div>
    </div>
    </>
  )
}
