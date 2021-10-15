import { BrowserRouter as Router, Route } from 'react-router-dom';

import FormJoin from './pages/FormJoin';
import Chat from './pages/Chat';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={FormJoin} />
      <Route path="/chat" component={Chat} />
    </Router>
  );
};

export default App;
