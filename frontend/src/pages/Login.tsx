import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1️⃣ Login (sets HttpOnly cookie)
      await loginUser({ email, password });

      // 2️⃣ Sync auth state from cookie
      await refreshAuth();

      // 3️⃣ Redirect to protected home
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">
              Login to continue shopping
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-4">
            <AuthInput
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />

            <AuthInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold
                       hover:bg-indigo-700 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </form>

        {/* Branding */}
        <p className="text-center text-xs text-white/70 mt-6">
          Secure login • Cookie-based authentication
        </p>
      </div>
    </div>
  );
};

export default Login;
