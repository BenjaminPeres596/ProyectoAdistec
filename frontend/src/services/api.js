const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

export function getTeams(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/api/teams${query ? `?${query}` : ''}`);
}

export function getTeamById(id) {
  return request(`/api/teams/${id}`);
}

export function getStats() {
  return request('/api/stats');
}

export function getExternalTeams(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/api/teams/external${query ? `?${query}` : ''}`);
}
