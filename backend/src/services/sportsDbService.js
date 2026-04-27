function buildSearchAllTeamsUrl({ country = 'Argentina', sport = 'Soccer' } = {}) {
	const baseUrl = process.env.SPORTSDB_BASE_URL;
	const apiKey = process.env.SPORTSDB_API_KEY;

	if (!baseUrl || !apiKey) {
		throw new Error('Faltan variables de entorno de TheSportsDB');
	}

	const endpoint = `${baseUrl}/${apiKey}/search_all_teams.php`;
	const params = new URLSearchParams({
		s: sport,
		c: country,
	});

	return `${endpoint}?${params.toString()}`;
}

function normalizeTeam(team) {
	return {
		id: Number(team.idTeam),
		name: team.strTeam,
		country: team.strCountry,
		league: team.strLeague,
		formedYear: team.intFormedYear ? Number(team.intFormedYear) : null,
		stadium: team.strStadium,
		badge: team.strBadge,
	};
}

async function getExternalTeams({ country, sport } = {}) {
	const url = buildSearchAllTeamsUrl({ country, sport });
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`TheSportsDB respondio con estado ${response.status}`);
	}

	const payload = await response.json();
	const teams = Array.isArray(payload.teams) ? payload.teams : [];

	return teams.map(normalizeTeam);
}

module.exports = {
	getExternalTeams,
};
