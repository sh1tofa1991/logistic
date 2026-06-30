import { Link, useLocation } from 'react-router-dom';
import { Truck, ArrowLeft } from 'lucide-react';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-[#0A192F] rounded-2xl flex items-center justify-center mx-auto mb-8">
          <Truck className="w-10 h-10 text-[#2684FF]" />
        </div>

        <div className="mono text-[#0052CC] text-xs uppercase tracking-[0.3em] mb-4">
          Ошибка 404
        </div>

        <h1 className="text-5xl sm:text-6xl font-black text-[#0A192F] uppercase mb-4">
          Страница не найдена
        </h1>

        <div className="w-12 h-1 bg-[#0052CC] mx-auto mb-6" />

        <p className="text-[#0A192F]/50 text-base mb-2">
          Страница <span className="font-medium text-[#0A192F]/70">«{pageName || '—'}»</span> не существует
        </p>
        <p className="text-[#0A192F]/40 text-sm mb-10">
          Возможно, она была перемещена или удалена
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest px-8 py-3 hover:bg-[#2684FF] transition-colors rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>
    </div>
  );
}