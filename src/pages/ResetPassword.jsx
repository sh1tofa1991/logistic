import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { localAuth } from "@/lib/localAuth";
import { Lock, Loader2, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (resetToken && !localAuth.validateResetToken(resetToken)) {
      setTokenValid(false);
    }
  }, [resetToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Пароль должен быть минимум 6 символов");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      await localAuth.resetPassword(resetToken, newPassword);
      setDone(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken || !tokenValid) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-red-400/10 border border-red-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase mb-4">Недействительная ссылка</h1>
          <p className="text-white/50 text-sm mb-8">
            Ссылка для сброса пароля отсутствует, устарела или уже использована.
          </p>
          <Link
            to="/forgot-password"
            className="inline-flex items-center gap-2 text-[#2684FF] mono text-sm hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4" /> Запросить новую ссылку
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-[#0052CC]/20 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#2684FF]" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase mb-4">Пароль изменён</h1>
          <p className="text-white/50 text-sm">
            Перенаправляем на страницу входа...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Новый пароль</h1>
          <p className="text-white/40 text-sm mt-2">Введите новый пароль</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          {error && (
            <div className="mb-5 p-3 border border-red-400/30 bg-red-400/10 mono text-xs text-red-300 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Новый пароль</label>
              <input
                type="password"
                autoComplete="new-password"
                autoFocus
                placeholder="Минимум 6 символов"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                <>Сбросить пароль <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          <Link to="/login" className="text-[#2684FF] hover:text-white transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Назад к входу
          </Link>
        </p>
      </div>
    </div>
  );
}