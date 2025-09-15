import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/register", { name, email, password });
      localStorage.setItem("token", data.token); // ✅ save token
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
