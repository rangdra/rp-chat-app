import React from "react";
import Join from "./components/Join/Join";

import { BrowserRouter as Router, Route } from "react-router-dom";
import ChatScreen from "./screens/ChatScreen";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={ChatScreen} />
    </Router>
  );
};

export default App;
