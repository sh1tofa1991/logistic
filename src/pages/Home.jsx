import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Plane, Ship, ArrowRight, Shield, Clock, MapPin, Award, ChevronDown } from 'lucide-react';
import ApplicationModal from '@/components/ApplicationModal';
import Footer from '@/components/Footer';

const STATS = [
  { value: 8, suffix: '+', label: 'Лет на рынке' },
  { value: 8400, suffix: '', label: 'Рейсов выполнено' },
  { value: 120, suffix: '', label: 'Единиц техники' },
  { value: 99.2, suffix: '%', label: 'Доставлено в срок' },
];

const SERVICES = [
  {
    id: 'auto',
    Icon: Truck,
    title: 'Автомобильные перевозки',
    sub: 'Грузовики и фуры по РФ',
    desc: 'Полная и сборная загрузка по всей России. Рефрижераторы, тентованные, бортовые прицепы.',
    specs: ['До 20 тонн', 'Любые маршруты РФ', 'GPS-мониторинг', 'Страховка включена'],
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
  },
  {
    id: 'avia',
    Icon: Plane,
    title: 'Авиаперевозки',
    sub: 'Срочные и ценные грузы',
    desc: 'Экспресс-доставка грузов авиатранспортом по России. Чартер и регулярные рейсы.',
    specs: ['До 100 кг экспресс', 'Маршруты по РФ', 'Таможня под ключ', 'Доставка 24–72 ч'],
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  },
  {
    id: 'container',
    Icon: Ship,
    title: 'Сборные грузы',
    sub: 'Экономная отправка',
    desc: 'Консолидация и сборка грузов со складов в Москве, Владимире и Санкт-Петербурге. Отправляем по всей России.',
    specs: ['От 1 кг', 'Консолидация грузов', 'Склады по всей РФ', 'Отслеживание онлайн'],
    img: 'https://perper.ru/img/articles/Transportirovka-sbornyh-gruzov-po-Rossii-na-furah.jpg',
  },
];

const ADVANTAGES = [
  { Icon: Shield, title: 'Надёжность', desc: 'Страхование каждого груза. Полная ответственность за сохранность.' },
  { Icon: Clock, title: 'Точность', desc: '99.2% доставок вовремя. Реальный GPS-контроль на всём маршруте.' },
  { Icon: MapPin, title: 'Склады по РФ', desc: 'Собственные склады в Москве, Владимире и Санкт-Петербурге и других городах.' },
  { Icon: Award, title: 'Опыт', desc: 'С 2018 года в отрасли. Более 8 400 выполненных рейсов по России.' },
];

function useCountUp(target, duration = 2200) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    let rafId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label }) {
  const { count, ref } = useCountUp(value);
  const display = value % 1 !== 0
    ? count.toFixed(1)
    : Math.round(count).toLocaleString('ru-RU');
  return (
    <div ref={ref} className="bg-[#0A192F] p-8 text-center">
      <div className="text-3xl sm:text-4xl font-black text-white mb-1">{display}{suffix}</div>
      <div className="text-white/40 text-sm">{label}</div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-[#F8FAFC]">
      <div className="loader-bar" />

      {/* ═══ HERO ═══ */}
      <section className="relative h-screen min-h-[640px] overflow-hidden flex flex-col items-center justify-center">
        <div ref={heroRef} className="absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1600&q=85"
            alt="Fleet"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/80 via-[#0A192F]/60 to-[#0A192F]/90" />
        </div>

        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0052CC]/40 to-transparent hidden lg:block" />
        <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0052CC]/20 to-transparent hidden lg:block" />

        <div className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mono text-[#2684FF] text-xs uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#2684FF]" />
            ВладТрансЛогист — Грузоперевозки
            <span className="w-8 h-px bg-[#2684FF]" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-white uppercase leading-none tracking-tight mb-6">
            ЛОГИСТИКА<br />
            <span className="text-[#2684FF]">БЕЗ</span> ПРЕГРАД
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Грузоперевозки по всей России. Собственные склады в Москве, Владимире и Санкт-Петербурге. Надёжно, точно, профессионально.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-kinetic bg-[#0052CC] text-white font-bold uppercase tracking-widest mono text-sm px-10 py-4 border border-[#0052CC] hover:border-[#2684FF] transition-all duration-300 rounded-xl"
            >
              Оставить заявку
            </button>
            <Link to="/services" className="border border-white/30 text-white hover:border-white mono text-sm font-semibold uppercase tracking-widest px-10 py-4 transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2 rounded-xl">
              Наши услуги <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ═══ QUICK STATS ═══ */}
      <section className="bg-[#0A192F] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {STATS.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="mono text-xs text-[#0052CC] uppercase tracking-widest mb-3">// Наши направления</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A192F] uppercase">
              Виды перевозок
            </h2>
            <div className="w-12 h-1 bg-[#0052CC] mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ id, Icon, title, sub, desc, specs, img }) => (
              <div key={id} className="bracket-card group relative overflow-hidden border border-[#0A192F]/10 hover:border-[#0052CC] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0052CC]/10 bg-white rounded-xl flex flex-col h-full">
                <div className="h-48 overflow-hidden relative rounded-t-xl flex-shrink-0">
                  <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/40 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#0052CC] flex items-center justify-center flex-shrink-0 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-[#0A192F] text-base leading-tight">{title}</div>
                      <div className="mono text-xs text-[#0052CC]">{sub}</div>
                    </div>
                  </div>
                  <p className="text-[#0A192F]/60 text-sm leading-relaxed mb-5">{desc}</p>
                  <div className="space-y-1.5 mb-6 flex-grow">
                    {specs.map(spec => (
                      <div key={spec} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#2684FF] rounded-full flex-shrink-0" />
                        <span className="mono text-xs text-[#0A192F]/70">{spec}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full btn-kinetic bg-transparent border border-[#0052CC] text-[#0052CC] hover:text-white mono text-xs uppercase tracking-widest font-semibold py-2.5 transition-colors duration-300 rounded-lg mt-auto"
                  >
                    Заказать
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center gap-2 border border-[#0A192F]/20 hover:border-[#0052CC] text-[#0A192F] hover:text-[#0052CC] mono text-sm uppercase tracking-wider px-8 py-3 transition-all duration-200 rounded-xl">
              Все услуги <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ ADVANTAGES ═══ */}
      <section className="bg-[#0A192F] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-3">// Почему мы</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase">
              Наши преимущества
            </h2>
            <div className="w-12 h-1 bg-[#0052CC] mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map(({ Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 hover:border-[#0052CC]/50 transition-all duration-300 group rounded-xl">
                <div className="w-12 h-12 bg-[#0052CC]/20 border border-[#0052CC]/40 flex items-center justify-center mb-5 group-hover:bg-[#0052CC] transition-colors duration-300 rounded-xl">
                  <Icon className="w-6 h-6 text-[#2684FF] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══ */}
      <section className="py-20 bg-[#0052CC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="mono text-xs text-white/60 uppercase tracking-widest mb-2">// Готовы к отправке?</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase">
              Рассчитайте стоимость<br className="hidden lg:block" /> перевозки прямо сейчас
            </h2>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 bg-white text-[#0052CC] font-black uppercase tracking-widest mono text-sm px-10 py-4 hover:bg-[#F8FAFC] transition-colors duration-200 flex items-center gap-3 rounded-xl"
          >
            Оставить заявку <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <Footer />
      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}