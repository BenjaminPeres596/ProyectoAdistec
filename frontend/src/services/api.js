const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function buildQuery(params = {}) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );

  const query = new URLSearchParams(cleanParams).toString();
  return query ? `?${query}` : '';
}

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export function getTeams(params = {}) {
  return request(`/api/teams${buildQuery(params)}`).then((payload) => payload.data ?? []);
}

export function getTeamById(id) {
  return request(`/api/teams/${id}`).then((payload) => payload.data ?? null);
}

export function getStats() {
  return request('/api/stats').then((payload) => payload.data ?? null);
}

export function getExternalTeams(params = {}) {
  return request(`/api/teams/external${buildQuery(params)}`).then((payload) => payload.data ?? []);
}
