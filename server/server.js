const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const colors = require("colors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");


dotenv.config()

connectDB();


const PORT = process.env.PORT ;

const app = express();

//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use(express.json()); // TOO ACCEPT JSON DATA FROOM FRONT-END

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


const server = app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log("conneccted to socket.io");

    socket.on("setup", (userData) => {
      socket.join(userData._id);
        socket.emit("connected");
    });
  
  socket.on("join chat", (room) => {
    socket.join(room);
  console.log("User joined Room" + room);
  });

  socket.on('typing', (room) => socket.in(room).emit("typing"));
  socket.on("stop Typing", (room) => socket.in(room).emit("stop Typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log('chat.users dosnt exist');

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    })
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
})