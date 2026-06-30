const STORAGE_KEY = 'applications';

function readLocal() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const sampleData = [
      {
        id: '1',
        name: 'Иван Петров',
        phone: '+7 (999) 123-45-67',
        email: 'ivan@example.com',
        cargo_type: 'Электроника',
        service_type: 'auto',
        route_from: 'Москва',
        route_to: 'Санкт-Петербург',
        date: '2024-07-15',
        weight: '500',
        description: 'Ноутбуки и комплектующие',
        status: 'new',
        created_date: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Мария Иванова',
        phone: '+7 (999) 765-43-21',
        email: 'maria@example.com',
        cargo_type: 'Одежда',
        service_type: 'avia',
        route_from: 'Москва',
        route_to: 'Сочи',
        date: '2024-07-20',
        weight: '100',
        description: 'Сезонная коллекция',
        status: 'in_progress',
        created_date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        name: 'Алексей Сидоров',
        phone: '+7 (999) 555-66-77',
        email: 'alex@example.com',
        cargo_type: 'Строительные материалы',
        service_type: 'container',
        route_from: 'Новороссийск',
        route_to: 'Казань',
        date: '2024-07-10',
        weight: '5000',
        description: 'Кирпич и цемент',
        status: 'completed',
        created_date: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
  return JSON.parse(data);
}

function writeLocal(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function createLocalRecord(data) {
  return {
    ...data,
    id: data.id || Date.now().toString(),
    status: data.status || 'new',
    created_date: data.created_date || new Date().toISOString(),
  };
}

export async function listApplications() {
  return readLocal();
}

export async function createApplication(data) {
  const payload = { ...data, status: 'new' };
  const record = createLocalRecord(payload);
  const apps = readLocal();
  apps.unshift(record);
  writeLocal(apps);
  return record;
}

export async function updateApplication(id, data) {
  const apps = readLocal();
  const index = apps.findIndex((a) => a.id === id);
  if (index < 0) throw new Error('Заявка не найдена');
  const updated = { ...apps[index], ...data };
  apps[index] = updated;
  writeLocal(apps);
  return updated;
}
