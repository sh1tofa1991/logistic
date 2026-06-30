import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://media.base44.com/images/public/6a439266723bb2089c62b4cc/63dfd38d8_image.png"
                alt="ВладТрансЛогист"
                className="h-10 w-auto brightness-0 invert"
              />
              <div className="flex flex-col leading-none">
                <span className="font-black text-sm tracking-widest uppercase text-white">ВладТранс</span>
                <span className="mono text-xs text-[#2684FF]">ЛОГИСТ</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Грузоперевозки высшего уровня. Ваш надёжный партнёр в логистике — от первой мили до последней.
            </p>
            <div className="flex gap-3">
              <a href="https://vk.com/vladtranslogist" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#2684FF] hover:text-[#2684FF] transition-colors duration-200 rounded-lg">
                <span className="mono text-xs font-bold">ВК</span>
              </a>
              <a href="https://t.me/vladtranslogist" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-[#2684FF] hover:text-[#2684FF] transition-colors duration-200 rounded-lg">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mono text-xs uppercase tracking-widest text-[#2684FF] mb-5">Навигация</h4>
            <ul className="space-y-3">
              {[
                { label: 'Главная', path: '/' },
                { label: 'Услуги', path: '/services' },
                { label: 'О нас', path: '/about' },
                { label: 'Контакты', path: '/contacts' },
              ].map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group">
                    <ArrowRight className="w-3 h-3 text-[#0052CC] group-hover:text-[#2684FF] transition-colors" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mono text-xs uppercase tracking-widest text-[#2684FF] mb-5">Услуги</h4>
            <ul className="space-y-3">
              {[
                { label: 'Автомобильные перевозки', id: 'auto' },
                { label: 'Авиаперевозки', id: 'avia' },
                { label: 'Контейнерные перевозки', id: 'container' },
              ].map(({ label, id }) => (
                <li key={label}>
                  {id ? (
                    <Link to={`/services#${id}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group">
                      <ArrowRight className="w-3 h-3 text-[#0052CC] group-hover:text-[#2684FF] transition-colors" />
                      {label}
                    </Link>
                  ) : (
                    <Link to="/services" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group">
                      <ArrowRight className="w-3 h-3 text-[#0052CC] group-hover:text-[#2684FF] transition-colors" />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="mono text-xs uppercase tracking-widest text-[#2684FF] mb-5">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0052CC] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/60">г. Владимир, мкр. Юрьевец, Институтский городок, 26</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0052CC] flex-shrink-0" />
                <a href="tel:+79997108736" className="text-sm text-white/60 hover:text-white transition-colors">+7 (999) 710-87-36</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0052CC] flex-shrink-0" />
                <a href="mailto:info@vladtranslogist.ru" className="text-sm text-white/60 hover:text-white transition-colors">info@vladtranslogist.ru</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="mono text-xs text-white/30">© 2026 ВладТрансЛогист. Все права защищены.</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-blue"></div>
            <span className="mono text-xs text-white/30 ml-1">Система в работе</span>
          </div>
        </div>
      </div>
    </footer>
  );
}