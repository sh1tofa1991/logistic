import { useState } from "react";
import { Link } from "react-router-dom";
import { localAuth } from "@/lib/localAuth";
import { Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resetLink, setResetLink] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await localAuth.resetPasswordRequest(email);
      const link = `${window.location.origin}/reset-password?token=${result.token}`;
      setResetLink(link);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0052CC] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Сброс пароля</h1>
          <p className="text-white/40 text-sm mt-2">Введите email, привязанный к аккаунту</p>
        </div>

        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
          {sent ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-[#0052CC]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-[#2684FF]" />
              </div>
              <p className="text-white/70 text-sm mb-4">
                Ссылка для сброса пароля готова. Откройте её в браузере:
              </p>
              <a
                href={resetLink}
                className="mono text-xs text-[#2684FF] break-all hover:text-white transition-colors underline"
              >
                {resetLink}
              </a>
              <p className="text-white/40 text-xs mt-3">
                В реальном приложении ссылка была бы отправлена на ваш email
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 border border-red-400/30 bg-red-400/10 mono text-xs text-red-300 rounded-xl">
                  {error}
                </div>
              )}
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
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Отправить ссылку"
                )}
              </button>
            </form>
          )}
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