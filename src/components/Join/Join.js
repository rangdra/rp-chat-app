import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, makeStyles, Button } from "@material-ui/core";

import "./Join.css";

const useStyles = makeStyles((theme) => ({
  joinOuterContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    height: "100vh",
    alignItems: "center",
    backgroundColor: "#e9e9f3",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  joinInnerContainer: {
    width: "30%",
    backgroundColor: "#fff",
    padding: "20px 40px",
    borderRadius: "4px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    padding: "12px 0px",
    marginTop: 12,
  },
}));

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const classes = useStyles();
  return (
    <div className={classes.joinOuterContainer}>
      <div className={classes.joinInnerContainer}>
        <h1 className="heading">Gabung ke chat!</h1>
        <div>
          <TextField
            type="text"
            label="Name"
            variant="outlined"
            onChange={(event) => setName(event.target.value)}
            className={classes.input}
          />
        </div>
        <div>
          <TextField
            type="text"
            label="Room"
            variant="outlined"
            onChange={(event) => setRoom(event.target.value)}
            className={classes.input}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          <Link
            onClick={(e) => (!name || !room ? e.preventDefault() : null)}
            to={`/chat?name=${name}&room=${room}`}
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
}
