import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route goes to Login */}
        <Route path="/" element={<Login />} />

        {/* Explicit Login route */}
        <Route path="/login" element={<Login />} />

        {/* Registration route */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard (protected) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
