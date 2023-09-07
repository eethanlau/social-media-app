const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
  users.push({userId, socketId});
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find(user => user.userId === userId);
}

//Establish socket.io connection
//Allows for users to send private or public messages to one another accordingly
io.on("connection", (socket) => {
  //Connect the users between each other to send messages appropriately
  console.log("User connected.");
  //Take the userId and socketId from the user accordingly
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    //Get the users accordingly
    io.emit("getUsers", users);
  });

  //Send and get a mesage
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId, text, 
    })
  });
  
  //Disconnect the users accordingly
  socket.on("disconnect", () => {
    console.log("A user has disconnected from the server!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  })
});