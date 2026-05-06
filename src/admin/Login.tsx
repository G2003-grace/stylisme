import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./api";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Échec de la connexion");
      }

      localStorage.setItem("adminToken", data.token);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-12">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-3">SamStyle</p>
          <h1 className="font-serif text-4xl">Administration</h1>
          <div className="w-12 h-px bg-[#C8A165] mx-auto mt-6"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div>
            <label className="text-xs tracking-[0.3em] uppercase text-gray-400 block mb-3">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-transparent border-b border-gray-600 py-3 text-lg focus:outline-none focus:border-[#C8A165] transition"
            />
          </div>

          {error && (
            <div className="border border-red-500/30 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C8A165] text-white py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default Login;
