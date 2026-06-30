import { useState } from 'react';
import { X, Truck, Plane, Ship, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { createApplication } from '@/lib/applications';

const STEPS = ['Тип перевозки', 'Маршрут', 'Груз', 'Контакты'];

const serviceTypes = [
  { id: 'auto', label: 'Автомобильная', sub: 'Грузовики и фуры', Icon: Truck },
  { id: 'avia', label: 'Авиаперевозка', sub: 'Срочные и ценные грузы', Icon: Plane },
  { id: 'container', label: 'Контейнерная/Морская', sub: 'Крупные партии', Icon: Ship },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,}$/;

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  let formatted = '+7';
  if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
  if (digits.length >= 5) formatted += ') ' + digits.slice(4, 7);
  if (digits.length >= 8) formatted += '-' + digits.slice(7, 9);
  if (digits.length >= 10) formatted += '-' + digits.slice(9, 11);
  return formatted;
}

function validateStep(step, form) {
  if (step === 0) return { ok: true };
  if (step === 1) {
    if (!form.route_from.trim()) return { ok: false, msg: 'Укажите город отправления' };
    if (!form.route_to.trim()) return { ok: false, msg: 'Укажите город назначения' };
    return { ok: true };
  }
  if (step === 2) {
    if (!form.cargo_type.trim()) return { ok: false, msg: 'Укажите тип груза' };
    if (form.weight && !/^\d+$/.test(form.weight)) return { ok: false, msg: 'Вес должен быть числом' };
    return { ok: true };
  }
  if (step === 3) {
    if (!form.name.trim() || !NAME_RE.test(form.name.trim())) return { ok: false, msg: 'Введите корректное имя (только буквы)' };
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) return { ok: false, msg: 'Введите полный номер телефона, 11 цифр' };
    if (form.email && !EMAIL_RE.test(form.email)) return { ok: false, msg: 'Введите корректный email' };
    return { ok: true };
  }
  return { ok: true };
}

export default function ApplicationModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    service_type: '',
    route_from: '',
    route_to: '',
    date: '',
    cargo_type: '',
    weight: '',
    description: '',
    name: '',
    phone: '',
    email: '',
  });

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleNext = () => {
    const result = validateStep(step, form);
    if (!result.ok) { setError(result.msg); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = async () => {
    const result = validateStep(3, form);
    if (!result.ok) { setError(result.msg); return; }
    setLoading(true);
    setError('');
    try {
      await createApplication(form);
      setDone(true);
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#0A192F] border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <span className="mono text-xs text-[#2684FF] uppercase tracking-widest">Заявка на перевозку</span>
            {!done && <p className="text-white font-bold mt-0.5">{STEPS[step]}</p>}
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!done && (
          <div className="flex border-b border-white/10">
            {STEPS.map((s, i) => (
              <div key={s} className={`flex-1 h-0.5 transition-colors duration-500 ${i <= step ? 'bg-[#0052CC]' : 'bg-white/10'}`} />
            ))}
          </div>
        )}

        <div className="px-6 py-8">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#0052CC]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#2684FF]" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Заявка принята!</h3>
              <p className="text-white/60 text-sm mb-6">Наш менеджер свяжется с вами в ближайшее время.</p>
              <button onClick={onClose} className="btn-kinetic bg-[#0052CC] text-white px-8 py-2.5 mono text-sm uppercase tracking-wider font-semibold rounded-xl">
                Закрыть
              </button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 p-3 border border-red-400/30 bg-red-400/10 mono text-xs text-red-300 rounded-xl">
                  {error}
                </div>
              )}

              {/* Step 0 */}
              {step === 0 && (
                <div className="space-y-3">
                  {serviceTypes.map(({ id, label, sub, Icon }) => (
                    <button
                      key={id}
                      onClick={() => { set('service_type', id); setError(''); }}
                      className={`w-full flex items-center gap-4 p-4 border transition-all duration-200 text-left rounded-xl ${form.service_type === id ? 'border-[#0052CC] bg-[#0052CC]/10' : 'border-white/10 hover:border-white/30'}`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center rounded flex-shrink-0 ${form.service_type === id ? 'bg-[#0052CC]' : 'bg-white/10'}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{label}</div>
                        <div className="mono text-xs text-white/40">{sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Откуда</label>
                    <input
                      value={form.route_from}
                      onChange={e => set('route_from', e.target.value)}
                      placeholder="Город отправления"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Куда</label>
                    <input
                      value={form.route_to}
                      onChange={e => set('route_to', e.target.value)}
                      placeholder="Город назначения"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Желаемая дата</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => set('date', e.target.value)}
                      className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors [color-scheme:dark] rounded-xl"
                    />
                  </div>
                  <div className="flex items-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl">
                    <span className="mono text-xs text-white/50 flex-1 truncate">{form.route_from || '—'}</span>
                    <div className="flex-1 h-px bg-[#0052CC] relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#2684FF] rounded-full"></div>
                    </div>
                    <span className="mono text-xs text-white/50 flex-1 truncate text-right">{form.route_to || '—'}</span>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Тип груза</label>
                    <input
                      value={form.cargo_type}
                      onChange={e => set('cargo_type', e.target.value)}
                      placeholder="Напр.: электроника, стройматериалы"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Вес (кг)</label>
                    <input
                      value={form.weight}
                      onChange={e => { const v = e.target.value; if (v === '' || /^\d+$/.test(v)) set('weight', v); }}
                      placeholder="Только цифры"
                      inputMode="numeric"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Дополнительно</label>
                    <textarea
                      value={form.description}
                      onChange={e => set('description', e.target.value)}
                      placeholder="Особые условия перевозки, габариты..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors resize-none rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Имя *</label>
                    <input
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Только буквы"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Телефон *</label>
                    <input
                      value={form.phone}
                      onChange={e => set('phone', formatPhone(e.target.value))}
                      placeholder="+7 (___) ___-__-__"
                      inputMode="numeric"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="mono text-xs text-[#2684FF] uppercase tracking-wider block mb-2">Email</label>
                    <input
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="email@example.com"
                      type="email"
                      className="w-full bg-white/5 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-[#0052CC] transition-colors rounded-xl"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 gap-3">
                {step > 0 ? (
                  <button onClick={() => { setStep(s => s - 1); setError(''); }} className="border border-white/20 text-white/60 hover:text-white mono text-sm px-5 py-2.5 transition-colors uppercase tracking-wider rounded-xl">
                    Назад
                  </button>
                ) : <div />}
                {step < 3 ? (
                  <button onClick={handleNext} className="btn-kinetic bg-[#0052CC] text-white flex items-center gap-2 mono text-sm px-6 py-2.5 font-semibold uppercase tracking-wider transition-all rounded-xl">
                    Далее <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={loading} className="flex items-center gap-2 btn-kinetic bg-[#0052CC] text-white mono text-sm px-6 py-2.5 font-semibold uppercase tracking-wider disabled:opacity-50 rounded-xl">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    Отправить
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}