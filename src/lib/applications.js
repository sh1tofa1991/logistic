import { base44 } from '@/api/base44Client';

const STORAGE_KEY = 'applications';

function readLocal() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Initialize with sample data if empty
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

function upsertLocal(record) {
  const apps = readLocal();
  const index = apps.findIndex((a) => a.id === record.id);
  if (index >= 0) {
    apps[index] = { ...apps[index], ...record };
  } else {
    apps.unshift(record);
  }
  writeLocal(apps);
  return apps;
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
  try {
    const data = await base44.entities.Application.list('-created_date', 500);
    writeLocal(data);
    return data;
  } catch (error) {
    console.warn('Base44 unavailable, using local applications cache', error);
    return readLocal();
  }
}

export async function createApplication(data) {
  const payload = { ...data, status: 'new' };

  try {
    const created = await base44.entities.Application.create(payload);
    upsertLocal(created);
    return created;
  } catch (error) {
    console.warn('Base44 create failed, saving locally', error);
    const local = createLocalRecord(payload);
    upsertLocal(local);
    return local;
  }
}

export async function updateApplication(id, data) {
  try {
    const updated = await base44.entities.Application.update(id, data);
    upsertLocal(updated);
    return updated;
  } catch (error) {
    console.warn('Base44 update failed, updating local cache', error);
    const apps = readLocal();
    const index = apps.findIndex((a) => a.id === id);
    if (index < 0) throw new Error('Заявка не найдена');
    const updated = { ...apps[index], ...data };
    apps[index] = updated;
    writeLocal(apps);
    return updated;
  }
}
