import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
