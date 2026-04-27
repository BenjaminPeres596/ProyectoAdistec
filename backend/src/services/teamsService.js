const fs = require('fs/promises');
const path = require('path');

// Ruta absoluta al JSON local que actua como fuente principal de datos.
const TEAMS_FILE_PATH = path.join(__dirname, '..', 'data', 'teams.json');

const ALLOWED_SORT_FIELDS = ['name', 'founded', 'favoriteScore'];
const ALLOWED_SORT_ORDERS = ['asc', 'desc'];

async function readTeamsFromFile() {
	const fileContent = await fs.readFile(TEAMS_FILE_PATH, 'utf-8');
	const teams = JSON.parse(fileContent);

	if (!Array.isArray(teams)) {
		throw new Error('Invalid teams data format. Expected an array.');
	}

	return teams;
}

function filterTeams(teams, { country, league, search }) {
	// Se aplica cada filtro solo si llega en query params.
	let result = [...teams];

	if (country) {
		const countryQuery = country.trim().toLowerCase();
		result = result.filter((team) => team.country.toLowerCase() === countryQuery);
	}

	if (league) {
		const leagueQuery = league.trim().toLowerCase();
		result = result.filter((team) => team.league.toLowerCase() === leagueQuery);
	}

	if (search) {
		const searchQuery = search.trim().toLowerCase();
		result = result.filter((team) => team.name.toLowerCase().includes(searchQuery));
	}

	return result;
}

function sortTeams(teams, { sortBy = 'name', order = 'asc' }) {
	// Si llega un criterio invalido, se usa un fallback seguro.
	const normalizedSortBy = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'name';
	const normalizedOrder = ALLOWED_SORT_ORDERS.includes(order) ? order : 'asc';

	const sorted = [...teams].sort((a, b) => {
		const valueA = a[normalizedSortBy];
		const valueB = b[normalizedSortBy];

		if (typeof valueA === 'string' && typeof valueB === 'string') {
			return valueA.localeCompare(valueB);
		}

		return valueA - valueB;
	});

	return normalizedOrder === 'desc' ? sorted.reverse() : sorted;
}

async function getProcessedTeams(query = {}) {
	// Pipeline principal: leer -> filtrar -> ordenar.
	const teams = await readTeamsFromFile();
	const filtered = filterTeams(teams, query);
	return sortTeams(filtered, query);
}

async function getTeamById(teamId) {
	const teams = await readTeamsFromFile();
	return teams.find((team) => team.id === Number(teamId)) || null;
}

async function getTeamsStats() {
	const teams = await readTeamsFromFile();

	const totalTeams = teams.length;
	const averageFavoriteScore =
		totalTeams === 0
			? 0
			: Number(
					(teams.reduce((acc, team) => acc + team.favoriteScore, 0) / totalTeams).toFixed(2)
				);

	const teamsByCountry = teams.reduce((acc, team) => {
		acc[team.country] = (acc[team.country] || 0) + 1;
		return acc;
	}, {});

	// Se priorizan los 5 equipos con mayor score para resumen rapido.
	const topFavoriteTeams = [...teams]
		.sort((a, b) => b.favoriteScore - a.favoriteScore)
		.slice(0, 5)
		.map((team) => ({
			id: team.id,
			name: team.name,
			favoriteScore: team.favoriteScore,
		}));

	return {
		totalTeams,
		averageFavoriteScore,
		teamsByCountry,
		topFavoriteTeams,
	};
}

module.exports = {
	getProcessedTeams,
	getTeamById,
	getTeamsStats,
};
