import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const InputSendMessage = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="send-message">
      <Input
        bordered={false}
        placeholder="Send a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <Button
        style={{ backgroundColor: '#22C55E' }}
        htmlType="submit"
        onClick={(e) => sendMessage(e)}
      >
        <SendOutlined style={{ color: '#fff' }} />
      </Button>
    </div>
  );
};

export default InputSendMessage;
