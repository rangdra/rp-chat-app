import ReactEmoji from 'react-emoji';

const MessageItem = ({ message, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="send-msg-wrapper" style={{ justifyContent: 'flex-end' }}>
      <div className="msg-time">
        <p>{message.user}</p>
        <p>{message.time}</p>
      </div>{' '}
      <div
        className="msg-text"
        style={{ background: '#22C55E', marginLeft: 8 }}
      >
        {ReactEmoji.emojify(message.text)}
      </div>
    </div>
  ) : (
    <div className="send-msg-wrapper" style={{ justifyContent: 'flex-start' }}>
      <div
        className="msg-text"
        style={{ background: '#334155', marginRight: 8 }}
      >
        {ReactEmoji.emojify(message.text)}
      </div>{' '}
      <div className="msg-time">
        <p>{message.user}</p>
        <p>{message.time}</p>
      </div>
    </div>
  );
};

export default MessageItem;
