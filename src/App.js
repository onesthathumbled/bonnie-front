import "./App.css";
import Navbar from "./components/Navbar";
import LeftBar from "./components/LeftBar";
import Feed from "./components/Feed";
import RightBar from "./components/RightBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <LeftBar />
      <Feed />
      <RightBar />
    </div>
  );
}

export default App;
