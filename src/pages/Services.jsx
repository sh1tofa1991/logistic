import { useState } from 'react';
import { Truck, Plane, Ship, CheckCircle, ArrowRight, Package } from 'lucide-react';
import ApplicationModal from '@/components/ApplicationModal';
import Footer from '@/components/Footer';

const SERVICES = [
  {
    id: 'auto',
    Icon: Truck,
    title: 'Автомобильные перевозки',
    tagline: 'Грузовики и фуры — по всей России',
    desc: 'Организуем грузовые перевозки автотранспортом с полной и сборной загрузкой. Собственный парк техники более 120 единиц: тентованные фуры, рефрижераторы, бортовые платформы, автовозы. Работаем по всей России.',
    features: [
      'Полная (FTL) и сборная (LCL) загрузка',
      'Рефрижераторы для скоропортящихся грузов',
      'GPS-мониторинг 24/7',
      'Страхование груза',
      'Доставка «от двери до двери»',
      'Маршруты по всей России',
    ],
    specs: { weight: 'До 20 тонн', volume: 'До 90 м³', time: '1–15 дней' },
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&q=80',
  },
  {
    id: 'avia',
    Icon: Plane,
    title: 'Авиаперевозки',
    tagline: 'Срочные и ценные грузы — по России',
    desc: 'Экспресс-доставка грузов воздушным транспортом. Работаем с регулярными рейсами ведущих авиакомпаний и организуем чартерные перевозки. Идеально для срочных, ценных и опасных грузов с особыми условиями хранения.',
    features: [
      'Регулярные и чартерные рейсы',
      'Направления по всей России',
      'Таможенное оформление под ключ',
      'Специальные условия для опасных грузов',
      'Отслеживание в реальном времени',
      'Срок доставки от 24 часов',
    ],
    specs: { weight: 'До 1000 кг', volume: 'До 10 м³', time: '24–72 часа' },
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  },
  {
    id: 'container',
    Icon: Ship,
    title: 'Контейнерные / Морские',
    tagline: 'Крупные партии по России',
    desc: 'Морские контейнерные перевозки через порты России. Организуем полную и частичную загрузку контейнеров. Направления по всей России. Собственные терминалы в портах.',
    features: [
      'Стандартные 20 и 40-футовые контейнеры',
      'Рефрижераторные и спецконтейнеры',
      'Полная (FCL) и частичная (LCL) загрузка',
      'Порты: Владивосток, Находка, Восточный',
      'Таможенное оформление и брокеридж',
      'Страхование груза по всему маршруту',
    ],
    specs: { weight: 'До 25 тонн', volume: 'До 67 м³', time: '15–45 дней' },
    img: 'https://titancont.ru/upload/iblock/b7f/y6d5m5di6iesukp73qwnwprw1ejse9e1.jpg',
  },
];

const EXTRA = [
  { Icon: Package, title: 'Страхование грузов', desc: 'Комплексное страхование на весь маршрут от ведущих страховых компаний.' },
  { Icon: CheckCircle, title: 'Таможенное оформление', desc: 'Полный пакет таможенных документов. Собственные таможенные брокеры.' },
  { Icon: ArrowRight, title: 'Ответственное хранение', desc: 'Складское хранение грузов в Владивостоке на собственных терминалах.' },
];

export default function Services() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#F8FAFC]">
      {/* Hero */}
      <div className="relative bg-[#0A192F] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c1?w=1400&q=70" alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-4">// Услуги компании</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase mb-4">
            Виды перевозок
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Комплексные логистические решения для любых типов грузов и направлений.
          </p>
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-[#0052CC]/30" />
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-16">
          {SERVICES.map(({ id, Icon, title, tagline, desc, features, specs, img }, idx) => (
            <div
              key={id}
              id={id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div               className={`relative overflow-hidden h-72 lg:h-96 bracket-card rounded-xl ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 to-transparent" />
                {/* Specs overlay */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="glass-card px-3 py-2 text-center">
                      <div className="mono text-xs text-white/50 uppercase">{k === 'weight' ? 'Вес' : k === 'volume' ? 'Объём' : 'Срок'}</div>
                      <div className="mono text-xs text-white font-bold mt-0.5">{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#0052CC] flex items-center justify-center flex-shrink-0 rounded-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="mono text-xs text-[#0052CC] uppercase tracking-wider">{tagline}</div>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0A192F] uppercase mb-4">{title}</h2>
                <div className="w-8 h-0.5 bg-[#0052CC] mb-5" />
                <p className="text-[#0A192F]/60 text-sm leading-relaxed mb-6">{desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#0052CC] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#0A192F]/70">{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-kinetic bg-[#0052CC] text-white mono text-sm font-semibold uppercase tracking-widest px-8 py-3 flex items-center gap-2 rounded-xl"
                >
                  Заказать перевозку <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra services */}
      <div className="bg-[#0A192F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mono text-xs text-[#2684FF] uppercase tracking-widest mb-8">// Дополнительные услуги</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRA.map(({ Icon, title, desc }) => (
              <div key={title} className="glass-card p-6 border border-white/10 hover:border-[#0052CC]/50 transition-all duration-300 rounded-xl">
                <Icon className="w-6 h-6 text-[#2684FF] mb-4" />
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-white/50 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0052CC] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-4">Не нашли нужный вид перевозки?</h2>
          <p className="text-white/70 text-sm mb-8">Свяжитесь с нами — мы найдём индивидуальное решение</p>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-white text-[#0052CC] font-black mono text-sm uppercase tracking-widest px-10 py-4 hover:bg-[#F8FAFC] transition-colors rounded-xl"
          >
            Оставить заявку
          </button>
        </div>
      </div>

      <Footer />
      {modalOpen && <ApplicationModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}