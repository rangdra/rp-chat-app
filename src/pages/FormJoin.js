import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';

const FormJoin = () => {
  const history = useHistory();

  const onFinish = (values) => {
    history.push(`/chat?name=${values.name}&room=${values.room}`);
  };
  return (
    <div className="form-container">
      <Form onFinish={onFinish} autoComplete="off" className="form-wrapper">
        <h1>Gabung ke room!</h1>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            size="large"
            placeholder="Your Name..."
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="room"
          rules={[{ required: true, message: 'Please input your room!' }]}
        >
          <Input size="large" placeholder="Room..." prefix={<HomeOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<LoginOutlined />}
          >
            Join
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormJoin;
