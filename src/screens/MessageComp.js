import React from "react";
import ReactEmoji from "react-emoji";

const MessageComp = ({ message: { text, user, time }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 8,
        justifyContent: "flex-end",
      }}
    >
      <div style={{ marginRight: 8 }}>
        <p style={{ margin: 0, fontSize: 14, color: "#828282" }}>{user}</p>
        <p style={{ margin: 0, fontSize: 12, color: "#828282" }}>{time}</p>
      </div>
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 9999,
          backgroundColor: "#22D3EE",
        }}
      >
        <p style={{ margin: 0, color: "#fff" }}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: 10,
        marginBottom: 8,
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 9999,
          backgroundColor: "#a5a5a5",
        }}
      >
        <p style={{ margin: 0, color: "#fff" }}>{ReactEmoji.emojify(text)}</p>
      </div>
      <div style={{ marginLeft: 8 }}>
        <p style={{ margin: 0, fontSize: 14, color: "#828282" }}>{user}</p>
        <p style={{ margin: 0, fontSize: 12, color: "#828282" }}>{time}</p>
      </div>
    </div>
  );
};

export default MessageComp;
