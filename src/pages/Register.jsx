import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localAuth } from "@/lib/localAuth";
import { UserPlus, ArrowRight, Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }
    setLoading(true);
    try {
      await localAuth.register(email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || "Регистрация не удалась");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Регистрация</h1>
          <p className="text-white/40 text-sm mt-2">Создайте новый аккаунт</p>
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
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                required
              />
            </div>
            <div>
              <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Подтвердите пароль</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Создать аккаунт <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-[#2684FF] font-medium hover:text-white transition-colors">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}