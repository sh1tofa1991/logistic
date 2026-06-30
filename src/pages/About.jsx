import { useState } from 'react';
import { Users, Globe, Target, TrendingUp, ArrowRight, Building2, Truck, Plane, Ship, Award } from 'lucide-react';
import ApplicationModal from '@/components/ApplicationModal';
import Footer from '@/components/Footer';

const TIMELINE = [
  { year: '2018', event: 'Основание компании', desc: 'Начали с небольшого автопарка во Владимире. Фокус на региональные перевозки по Центральной России.', Icon: Building2 },
  { year: '2019', event: 'Расширение автопарка', desc: 'Приобретение рефрижераторов и тентованных фур. Открытие маршрутов в Москву и Санкт-Петербург.', Icon: Truck },
  { year: '2020', event: 'Авиаперевозки', desc: 'Запуск направления авиаперевозок для срочных грузов. Партнёрство с ведущими авиакомпаниями.', Icon: Plane },
  { year: '2022', event: 'Контейнерные перевозки', desc: 'Выход на рынок контейнерных перевозок. Собственные терминалы и склады.', Icon: Ship },
  { year: '2024', event: 'Лидер региона', desc: '120+ единиц техники, 8 400+ выполненных рейсов, присутствие в 40+ городах России.', Icon: Award },
];

const TEAM = [
  { name: 'Владимир Сергеев', role: 'Генеральный директор', exp: '18 лет в логистике', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Анна Морозова', role: 'Директор по логистике', exp: '12 лет опыта', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Денис Краснов', role: 'Начальник автопарка', exp: '15 лет в транспорте', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face&q=80' },
  { name: 'Мария Воронова', role: 'Таможенный брокер', exp: '10 лет практики', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&q=80' },
];

const VALUES = [
  { Icon: Target, title: 'Точность', desc: 'Каждый груз доставлен в срок и в целости — это не обещание, это стандарт.' },
  { Icon: Users, title: 'Команда', desc: '80+ профессионалов, объединённых целью — доставить груз туда, куда нужно.' },
  { Icon: TrendingUp, title: 'Рост', desc: 'Ежегодный рост 20%+. Мы постоянно инвестируем в технику и технологии.' },
  { Icon: Globe, title: 'Масштаб', desc: '40+ городов присутствия по всей России.' },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <div className="relative bg-[#0A192F] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=70"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase mb-4">
            С 2018 года в движении
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Строим надёжную логистику по всей России — от региональных перевозок до комплексных решений.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mono text-xs text-[#0052CC] uppercase tracking-widest mb-4">// Наша миссия</div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0A192F] uppercase mb-6">
                Грузы должны<br />двигаться без остановок
              </h2>
              <p className="text-[#0A192F]/60 text-base leading-relaxed mb-4">
                ВладТрансЛогист основан в 2018 году во Владимире с простой идеей: логистика должна работать как часы. Ваш бизнес не может позволить себе простои, опоздания и неожиданности. Поэтому мы построили систему, где каждый шаг под контролем — от отправки до получения.
              </p>
              <p className="text-[#0A192F]/60 text-base leading-relaxed">
                Начав с небольшого автопарка для региональных перевозок, сегодня мы управляем разветвлённой сетью по всей России. Автомобильные, авиа и контейнерные перевозки — всё в одном окне.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80"
                alt="Warehouse"
                loading="lazy"
                className="w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#0052CC] p-6 w-40">
                <div className="text-3xl font-black text-white">8+</div>
                <div className="mono text-xs text-white/70 uppercase mt-1">лет опыта</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0A192F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-3">// Ценности</div>
          <h2 className="text-3xl font-black text-white uppercase mb-12">На чём мы стоим</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 border border-white/10 hover:border-[#0052CC]/50 transition-all duration-300 group rounded-xl">
                <div className="w-10 h-10 bg-[#0052CC]/20 border border-[#0052CC]/40 flex items-center justify-center mb-4 group-hover:bg-[#0052CC] transition-colors duration-300 rounded-lg">
                  <Icon className="w-5 h-5 text-[#2684FF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#0052CC] uppercase tracking-widest mb-3">// История</div>
          <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-12">Путь компании</h2>
          <div className="space-y-8">
            {TIMELINE.map(({ year, event, desc, Icon }, i) => (
              <div key={year} className="relative flex flex-col lg:flex-row gap-5 lg:gap-8 pl-14 lg:pl-0">
                <div className="hidden lg:block mono text-xs text-[#0052CC] uppercase tracking-widest lg:w-24 flex-shrink-0 pt-1">{year}</div>
                <div className="absolute left-0 top-0 lg:relative lg:left-auto flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#0052CC]/10 border border-[#0052CC]/30 flex items-center justify-center flex-shrink-0 rounded-xl">
                    <Icon className="w-5 h-5 text-[#0052CC]" />
                  </div>
                  <div className="lg:hidden mono text-xs text-[#0052CC] uppercase tracking-widest pt-1.5">{year}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-[#0A192F] font-bold text-lg mb-1">{event}</h3>
                  <p className="text-[#0A192F]/50 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#0A192F] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-3">// Команда</div>
          <h2 className="text-3xl font-black text-white uppercase mb-12">Люди за маршрутом</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(({ name, role, exp, img }) => (
              <div key={name} className="glass-card border border-white/10 overflow-hidden group rounded-xl">
                <div className="h-48 overflow-hidden">
                  <img src={img} alt={name} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-bold">{name}</h3>
                  <div className="mono text-xs text-[#2684FF] mt-1 mb-2">{role}</div>
                  <div className="mono text-xs text-white/30">{exp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#0052CC] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-white uppercase">Доверьте груз профессионалам</h2>
            <p className="text-white/70 text-sm mt-1">8 лет опыта и 8 400+ успешных рейсов говорят сами за себя</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 bg-white text-[#0052CC] font-black mono text-sm uppercase tracking-widest px-10 py-4 hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 rounded-xl"
          >
            Отправить заявку <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Footer />
      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}