import { Route, Router } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={HomePage} />
      <Route path="/chats" component={ChatPage} />
      <Route path="/chatss" component={ChatPage} />
    </div>
  );
}

export default App;
