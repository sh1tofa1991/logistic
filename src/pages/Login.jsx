import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { LogIn, ArrowRight, Loader2 } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await login(email, password);
      navigate(session.user?.isAdmin ? '/admin' : '/');
    } catch (err) {
      setError(err.message || "Неверный email или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Вход в систему</h1>
          <p className="text-white/40 text-sm mt-2">Войдите в свой аккаунт</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          {error && (
            <div className="mb-5 p-3 border border-red-400/30 bg-red-400/10 mono text-xs text-red-300 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Email</label>
              <input
                type="email"
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                required
              />
            </div>
            <div>
              <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Пароль</label>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                required
              />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="mono text-xs text-[#2684FF] hover:text-white transition-colors">
                Забыли пароль?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Войти <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
            <p className="mono text-xs text-white/40 mb-2">Тестовый админ:</p>
            <p className="mono text-xs text-white/30">Email: {import.meta.env.VITE_ADMIN_EMAIL || 'admin@vladtranslogist.ru'}</p>
            <p className="mono text-xs text-white/30">Пароль: {import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'}</p>
          </div>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-[#2684FF] font-medium hover:text-white transition-colors">
            Создать
          </Link>
        </p>
      </div>
    </div>
  );
}