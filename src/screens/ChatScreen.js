import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu, Close, Message, PeopleAlt, Send } from "@material-ui/icons";
import ScrollToBottom from "react-scroll-to-bottom";
import MessageComp from "./MessageComp";

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#06b6d4",
  },
  innerContainer: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  leftContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  rightContainer: {
    width: "75%",
    backgroundColor: "#fff",
    height: "100%",
  },
  input: {
    marginRight: 10,
    width: "55%",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#fff",
  },
  closeButton: {
    color: "#fff",
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    fontWeight: "bold",
  },
}));

let socket;
const ChatScreen = ({ location }) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "https://rpchatapp.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className={classes.outerContainer}>
      <div className={classes.innerContainer}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CHAT APP
            </Typography>
            <Button color="inherit">
              <a href="/">
                <IconButton
                  edge="start"
                  className={classes.closeButton}
                  aria-label="menu"
                >
                  <Close />
                </IconButton>
              </a>
            </Button>
          </Toolbar>
        </AppBar>

        <div style={{ display: "flex", alignItems: "center", height: 350 }}>
          <div
            className={classes.leftContainer}
            style={{
              width: "30%",
              backgroundColor: "#22D3EE",
              padding: "0px 0px 0px 20px",
              height: "100%",
              zIndex: 2,
            }}
          >
            <div className="">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="start"
                  className={classes.closeButton}
                  aria-label="menu"
                >
                  <Message />
                </IconButton>
                <p style={{ color: "#fff" }}>Room Name: </p>
              </div>

              <div
                style={{
                  backgroundColor: "#D1D5DB",
                  padding: 6,
                }}
              >
                <p style={{ color: "#fff", margin: "0px 0px" }}>{room}</p>
              </div>
            </div>
            <div className="">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  edge="start"
                  className={classes.closeButton}
                  aria-label="menu"
                >
                  <PeopleAlt />
                </IconButton>
                <p style={{ color: "#fff", margin: "0px" }}>Users</p>
              </div>

              <div style={{}}>
                {users?.map((user) => (
                  <p
                    key={user?.id}
                    style={{ color: "#fff", margin: "0px 0px 8px" }}
                  >
                    {user?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div
            className="messages"
            style={{ width: "70%", backgroundColor: "#fff", height: "100%" }}
          >
            <ScrollToBottom>
              {messages.map((message, idx) => (
                <MessageComp message={message} name={name} key={idx} />
              ))}
            </ScrollToBottom>
          </div>
        </div>
        <Box
          borderTop={2}
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "8px 0px",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 99,
            borderColor: "#22D3EE",
          }}
        >
          <Input
            placeholder="Type a message"
            inputProps={{ "aria-label": "description" }}
            className={classes.input}
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.closeButton}
            style={{ marginRight: 12 }}
            endIcon={<Send />}
            onClick={(e) => sendMessage(e)}
          >
            Send
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default ChatScreen;
