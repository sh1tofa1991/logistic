const ADMIN_CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || 'admin@vladtranslogist.ru',
  password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
};

const USERS_KEY = 'local_users';
const SESSION_KEY = 'local_session';
const RESET_TOKENS_KEY = 'reset_tokens';

export const localAuth = {
  register: async (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    
    if (users.find(u => u.email === email)) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { user: { id: newUser.id, email: newUser.email } };
  },
  
  login: async (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const adminPassword = localStorage.getItem('base44_admin_password') || ADMIN_CREDENTIALS.password;
    
    // Check admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === adminPassword) {
      const session = {
        user: { id: 'admin', email: ADMIN_CREDENTIALS.email, isAdmin: true },
        token: 'admin-token-' + Date.now()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }
    
    const session = {
      user: { id: user.id, email: user.email, isAdmin: false },
      token: 'user-token-' + Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    return session;
  },
  
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },
  
  getSession: () => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem(SESSION_KEY);
  },
  
  isAdmin: () => {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed.user?.isAdmin === true;
  },

  resetPasswordRequest: async (email) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const isAdmin = email === ADMIN_CREDENTIALS.email;
    const user = users.find(u => u.email === email);

    if (!user && !isAdmin) {
      throw new Error('Пользователь с таким email не найден');
    }

    const token = 'reset-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '{}');
    tokens[token] = { email, expiresAt: Date.now() + 3600000 };
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));

    return { token, email };
  },

  validateResetToken: (token) => {
    const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '{}');
    const record = tokens[token];
    if (!record) return null;
    if (Date.now() > record.expiresAt) {
      delete tokens[token];
      localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));
      return null;
    }
    return record.email;
  },

  resetPassword: async (token, newPassword) => {
    const email = localAuth.validateResetToken(token);
    if (!email) throw new Error('Ссылка устарела или недействительна. Запросите новую.');

    if (email === ADMIN_CREDENTIALS.email) {
      localStorage.setItem('base44_admin_password', newPassword);
    }

    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const index = users.findIndex(u => u.email === email);
    if (index < 0) throw new Error('Пользователь не найден');
    users[index].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const tokens = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '{}');
    delete tokens[token];
    localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(tokens));
  }
};
