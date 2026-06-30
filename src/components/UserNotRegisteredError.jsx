import { ShieldAlert } from 'lucide-react';

const UserNotRegisteredError = () => {
  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-16 h-16 bg-red-400/10 border border-red-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-3xl font-black text-white uppercase mb-4">Доступ ограничен</h1>
        <p className="text-white/50 text-sm mb-6">
          Вы не зарегистрированы для использования этого приложения. Обратитесь к администратору для получения доступа.
        </p>
        <div className="bg-white/5 border border-white/10 p-5 text-left rounded-xl">
          <p className="mono text-xs text-white/40 mb-3">Возможные решения:</p>
          <ul className="space-y-2">
            <li className="mono text-xs text-white/30 flex items-start gap-2">
              <span className="text-[#2684FF] mt-0.5">•</span>
              Убедитесь, что вы вошли в правильный аккаунт
            </li>
            <li className="mono text-xs text-white/30 flex items-start gap-2">
              <span className="text-[#2684FF] mt-0.5">•</span>
              Свяжитесь с администратором для получения доступа
            </li>
            <li className="mono text-xs text-white/30 flex items-start gap-2">
              <span className="text-[#2684FF] mt-0.5">•</span>
              Попробуйте выйти и войти снова
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;