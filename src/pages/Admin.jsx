import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { listApplications, updateApplication } from '@/lib/applications';
import {
  Truck, Plane, Ship, ChevronDown, ChevronUp, Search, CheckCircle, Loader2, Activity, BarChart3,
  RefreshCw, Package, LogOut
} from 'lucide-react';

const STATUS_META = {
  new: { label: 'Новая', color: 'text-[#2684FF]', bg: 'bg-[#2684FF]/10 border-[#2684FF]/30', dot: 'bg-[#2684FF] pulse-blue' },
  in_progress: { label: 'В работе', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30', dot: 'bg-amber-400' },
  completed: { label: 'Выполнена', color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30', dot: 'bg-emerald-400' },
  cancelled: { label: 'Отклонена', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/30', dot: 'bg-red-400' },
};

const SERVICE_META = {
  auto: { label: 'Авто', Icon: Truck },
  avia: { label: 'Авиа', Icon: Plane },
  container: { label: 'Море', Icon: Ship },
};

const STATUSES = ['all', 'new', 'in_progress', 'completed', 'cancelled'];
const STATUS_LABELS = { all: 'Все', new: 'Новые', in_progress: 'В работе', completed: 'Выполнены', cancelled: 'Отклонены' };

export default function Admin() {
  const { logout } = useAuth();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [comment, setComment] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listApplications();
      setApps(data);
    } catch (err) {
      setError(err.message || 'Не удалось загрузить заявки');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filteredApps = apps.filter(a => {
    const matchStatus = filter === 'all' || a.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      (a.name || '').toLowerCase().includes(q) ||
      (a.phone || '').includes(q) ||
      (a.route_from || '').toLowerCase().includes(q) ||
      (a.route_to || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: apps.length,
    new: apps.filter(a => a.status === 'new').length,
    in_progress: apps.filter(a => a.status === 'in_progress').length,
    completed: apps.filter(a => a.status === 'completed').length,
    cancelled: apps.filter(a => a.status === 'cancelled').length,
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const updated = await updateApplication(id, { status });
      setApps((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError(err.message || 'Не удалось обновить статус');
    } finally {
      setUpdating(null);
    }
  };

  const saveComment = async (id) => {
    setUpdating(id);
    try {
      const updated = await updateApplication(id, { admin_comment: comment });
      setApps((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError(err.message || 'Не удалось сохранить комментарий');
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      {/* Top bar */}
      <div className="border-b border-white/10 sticky top-0 z-40 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#0052CC] flex items-center justify-center rounded">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-black text-sm tracking-widest uppercase">ВладТрансЛогист</div>
                <div className="mono text-xs text-[#2684FF]">DISPATCH HUB</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full pulse-blue" />
                <span className="mono text-xs text-white/40 hidden sm:inline">СИСТЕМА ОНЛАЙН</span>
              </div>
              <button onClick={() => logout()} className="flex items-center gap-1.5 mono text-xs text-white/40 hover:text-white transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Выход</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Всего заявок', value: counts.all, Icon: Package, color: 'text-white' },
            { label: 'Новые', value: counts.new, Icon: Activity, color: 'text-[#2684FF]' },
            { label: 'В работе', value: counts.in_progress, Icon: BarChart3, color: 'text-amber-400' },
            { label: 'Выполнено', value: counts.completed, Icon: CheckCircle, color: 'text-emerald-400' },
          ].map(({ label, value, Icon, color }) => (
            <div key={label} className="glass-card border border-white/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="mono text-xs text-white/40 uppercase">{label}</span>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className={`text-3xl font-black ${color}`}>{value}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-400/30 bg-red-400/10 mono text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по имени, телефону, маршруту..."
              className="w-full bg-white/5 border border-white/10 focus:border-[#0052CC] px-10 py-2.5 mono text-sm text-white placeholder-white/20 outline-none transition-colors rounded-xl"
            />
          </div>
          <button onClick={load} className="flex items-center gap-2 border border-white/20 hover:border-[#0052CC] px-4 py-2.5 mono text-sm text-white/60 hover:text-white transition-colors rounded-xl">
            <RefreshCw className="w-4 h-4" /> Обновить
          </button>
        </div>

        {/* Status tabs */}
        <div className="flex gap-1 flex-wrap mb-6">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`mono text-xs uppercase tracking-wider px-4 py-2 border transition-all duration-200 ${filter === s ? 'bg-[#0052CC] border-[#0052CC] text-white' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
            >
              {STATUS_LABELS[s]} {counts[s] > 0 && <span className="ml-1 opacity-60">({counts[s]})</span>}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#0052CC] animate-spin" />
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="mono text-sm text-white/30 uppercase">Заявок не найдено</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredApps.map(app => {
              const meta = STATUS_META[app.status] || STATUS_META.new;
              const svc = SERVICE_META[app.service_type] || SERVICE_META.auto;
              const SvcIcon = svc?.Icon || Package;
              const isExp = expanded === app.id;

              return (
                <div key={app.id} className="border border-white/10 hover:border-white/20 transition-colors bg-white/3">
                  {/* Row */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                    onClick={() => {
                      setExpanded(isExp ? null : app.id);
                      setComment(app.admin_comment || '');
                    }}
                  >
                    {/* Status dot */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />

                    {/* Service icon */}
                    <div className="w-8 h-8 bg-white/5 flex items-center justify-center flex-shrink-0">
                      <SvcIcon className="w-4 h-4 text-white/60" />
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-white">{app.name || '—'}</span>
                        <span className="mono text-xs text-white/30">{app.phone}</span>
                      </div>
                      <div className="mono text-xs text-white/40 mt-0.5 truncate">
                        {app.route_from} → {app.route_to}
                        {app.cargo_type && <span className="ml-2">· {app.cargo_type}</span>}
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 border mono text-xs ${meta.bg} ${meta.color}`}>
                      {meta.label}
                    </div>

                    {/* Date */}
                    <div className="hidden md:block mono text-xs text-white/30 flex-shrink-0">{formatDate(app.created_date)}</div>

                    {/* Toggle */}
                    <div className="text-white/30">
                      {isExp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expanded */}
                  {isExp && (
                    <div className="border-t border-white/10 px-5 py-5 bg-white/2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {[
                          { label: 'Email', value: app.email },
                          { label: 'Вид перевозки', value: svc?.label },
                          { label: 'Тип груза', value: app.cargo_type },
                          { label: 'Вес', value: app.weight },
                          { label: 'Маршрут', value: `${app.route_from} → ${app.route_to}` },
                          { label: 'Дата', value: app.date },
                        ].map(({ label, value }) => value ? (
                          <div key={label}>
                            <div className="mono text-xs text-white/30 uppercase mb-1">{label}</div>
                            <div className="text-white/80 text-sm">{value}</div>
                          </div>
                        ) : null)}
                        {app.description && (
                          <div className="sm:col-span-2 lg:col-span-3">
                            <div className="mono text-xs text-white/30 uppercase mb-1">Описание</div>
                            <div className="text-white/80 text-sm">{app.description}</div>
                          </div>
                        )}
                      </div>

                      {/* Status update */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <div className="flex-1">
                          <div className="mono text-xs text-white/30 uppercase mb-2">Изменить статус</div>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(STATUS_META).map(([key, m]) => (
                              <button
                                key={key}
                                onClick={() => updateStatus(app.id, key)}
                                disabled={app.status === key || updating === app.id}
                                className={`mono text-xs px-3 py-1.5 border transition-all ${app.status === key ? `${m.bg} ${m.color}` : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'} disabled:opacity-50`}
                              >
                                {updating === app.id ? <Loader2 className="w-3 h-3 animate-spin inline" /> : null}
                                {m.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <div>
                        <div className="mono text-xs text-white/30 uppercase mb-2">Комментарий администратора</div>
                        <div className="flex gap-2">
                          <input
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Добавить заметку..."
                            className="flex-1 bg-white/5 border border-white/10 focus:border-[#0052CC] px-3 py-2 mono text-xs text-white placeholder-white/20 outline-none transition-colors"
                          />
                          <button
                            onClick={() => saveComment(app.id)}
                            disabled={updating === app.id}
                            className="btn-kinetic bg-[#0052CC] text-white mono text-xs px-4 py-2 font-semibold uppercase tracking-wider disabled:opacity-50"
                          >
                            {updating === app.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Сохранить'}
                          </button>
                        </div>
                        {app.admin_comment && (
                          <div className="mt-2 mono text-xs text-white/40 italic">Текущее: {app.admin_comment}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}