import { Button, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  TeamOutlined,
  MessageOutlined,
  UserOutlined,
  ForwardFilled,
  CloseOutlined,
} from '@ant-design/icons';
import React, { useState, useEffect, useRef } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Logo from '../chat.png';
import MessageItem from '../components/MessageItem';
import InputSendMessage from '../components/InputSendMessage';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

let socket;
const Chat = ({ location }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'https://rpchatapp.herokuapp.com/';

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        <Sider trigger={null} collapsible collapsed={collapsed} width={150}>
          <div className="logo-wrapper">
            <img src={Logo} alt="logo" className="logo" />
            {!collapsed && <span>CHATSSS</span>}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['r1']}
            defaultOpenKeys={['sub1']}
          >
            <SubMenu key="sub1" title="Room" icon={<MessageOutlined />}>
              <Menu.Item key="r1" icon={<ForwardFilled />}>
                {room}
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Users" icon={<TeamOutlined />}>
              {users.map((user, idx) => (
                <Menu.Item icon={<UserOutlined />} key={idx + 1}>
                  {user?.name}
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
        </Sider>

        <Layout className="site-layout">
          <Header className="header" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: toggle,
              }
            )}
            <Button type="text">
              <a href="/">
                <CloseOutlined />
              </a>
            </Button>
          </Header>
          <Content className="site-layout-background msg-content">
            {messages.map((message, idx) => (
              <MessageItem message={message} name={name} key={idx} />
            ))}
            <div ref={scrollRef} />
          </Content>
          <InputSendMessage
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </Layout>
      </div>
    </div>
  );
};

export default Chat;
