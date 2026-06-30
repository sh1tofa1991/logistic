import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { createApplication } from '@/lib/applications';
import Footer from '@/components/Footer';

const CONTACTS = [
  { Icon: MapPin, label: 'Адрес', value: 'г. Владимир, мкр. Юрьевец, Институтский городок, 26', href: null },
  { Icon: Phone, label: 'Телефон', value: '+7 (999) 710-87-36', href: 'tel:+79997108736' },
  { Icon: Mail, label: 'Email', value: 'info@vladtranslogist.ru', href: 'mailto:info@vladtranslogist.ru' },
  { Icon: Clock, label: 'Режим работы', value: 'Пн–Пт: 09:00–18:00, Сб: 10:00–15:00', href: null },
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

export default function Contacts() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', cargo_type: 'Обратная связь', service_type: 'auto', route_from: 'Контактная форма', route_to: 'Контактная форма', description: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !NAME_RE.test(form.name.trim())) {
      setError('Введите корректное имя (только буквы)');
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      setError('Введите полный номер телефона, 11 цифр');
      return;
    }

    if (form.email && !EMAIL_RE.test(form.email)) {
      setError('Введите корректный email');
      return;
    }

    setLoading(true);
    try {
      await createApplication(form);
      setSent(true);
    } catch {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC]">
      <div className="bg-[#0A192F] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-4">// Свяжитесь с нами</div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase">Контакты</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="mono text-xs text-[#0052CC] uppercase tracking-widest mb-3">// Реквизиты</div>
            <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-8">Наши координаты</h2>
            <div className="space-y-5 mb-10">
              {CONTACTS.map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-4 border border-[#0A192F]/10 hover:border-[#0052CC] transition-colors group rounded-xl">
                  <div className="w-10 h-10 bg-[#0052CC]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0052CC] transition-colors rounded-lg">
                    <Icon className="w-4 h-4 text-[#0052CC] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="mono text-xs text-[#0A192F]/40 uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-[#0A192F] font-medium text-sm hover:text-[#0052CC] transition-colors">{value}</a>
                    ) : (
                      <span className="text-[#0A192F]/70 text-sm">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative h-56 bg-[#0A192F] overflow-hidden rounded-xl">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=40.3911,56.1523&z=17&pt=40.3911,56.1523,pm2rdm&text=Владимир%2C%20мкр.%20Юрьевец%2C%20Институтский%20городок%2C%2026"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                style={{ border: 0 }}
                title="Карта — Владимир, мкр. Юрьевец, Институтский городок, 26"
              />
            </div>
          </div>

          <div>
            <div className="mono text-xs text-[#0052CC] uppercase tracking-widest mb-3">// Форма обратной связи</div>
            <h2 className="text-2xl font-black text-[#0A192F] uppercase mb-8">Напишите нам</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 border border-[#0052CC]/30 bg-[#0052CC]/5 rounded-xl">
                <div className="w-14 h-14 bg-[#0052CC]/10 flex items-center justify-center mb-4 rounded-xl">
                  <CheckCircle className="w-7 h-7 text-[#0052CC]" />
                </div>
                <h3 className="text-[#0A192F] font-bold text-lg mb-1">Сообщение отправлено!</h3>
                <p className="text-[#0A192F]/50 text-sm">Мы свяжемся с вами в ближайшее время</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 border border-red-400/30 bg-red-400/10 mono text-xs text-red-500 rounded-xl">
                    {error}
                  </div>
                )}

                <div>
                  <label className="mono text-xs text-[#0052CC] uppercase tracking-wider block mb-2">Ваше имя *</label>
                  <input
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Только буквы"
                    required
                    className="w-full border border-[#0A192F]/20 focus:border-[#0052CC] px-4 py-3 text-sm text-[#0A192F] placeholder-[#0A192F]/30 outline-none transition-colors bg-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="mono text-xs text-[#0052CC] uppercase tracking-wider block mb-2">Телефон *</label>
                  <input
                    value={form.phone}
                    onChange={e => set('phone', formatPhone(e.target.value))}
                    placeholder="+7 (___) ___-__-__"
                    inputMode="numeric"
                    required
                    className="w-full border border-[#0A192F]/20 focus:border-[#0052CC] px-4 py-3 text-sm text-[#0A192F] placeholder-[#0A192F]/30 outline-none transition-colors bg-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="mono text-xs text-[#0052CC] uppercase tracking-wider block mb-2">Email</label>
                  <input
                    value={form.email || ''}
                    onChange={e => set('email', e.target.value)}
                    placeholder="email@example.com"
                    type="email"
                    className="w-full border border-[#0A192F]/20 focus:border-[#0052CC] px-4 py-3 text-sm text-[#0A192F] placeholder-[#0A192F]/30 outline-none transition-colors bg-white rounded-xl"
                  />
                </div>
                <div>
                  <label className="mono text-xs text-[#0052CC] uppercase tracking-wider block mb-2">Сообщение</label>
                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Опишите ваш вопрос или задачу..."
                    rows={4}
                    className="w-full border border-[#0A192F]/20 focus:border-[#0052CC] px-4 py-3 text-sm text-[#0A192F] placeholder-[#0A192F]/30 outline-none transition-colors bg-white resize-none rounded-xl"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest py-4 flex items-center justify-center gap-2 disabled:opacity-60 rounded-xl"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Отправить сообщение
                </button>
                <p className="mono text-xs text-[#0A192F]/30 text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки данных
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}