const { getProcessedTeams, getTeamById } = require('../services/teamsService');
const { getExternalTeams, getExternalCountries } = require('../services/sportsDbService');

async function listTeams(req, res) {
	try {
		const teams = await getProcessedTeams(req.query);

		res.json({
			total: teams.length,
			data: teams,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error al procesar datos de equipos',
			error: error.message,
		});
	}
}

async function getTeam(req, res) {
	try {
		const team = await getTeamById(req.params.id);

		if (!team) {
			return res.status(404).json({ message: 'Equipo no encontrado' });
		}

		return res.json({ data: team });
	} catch (error) {
		return res.status(500).json({
			message: 'Error al obtener equipo',
			error: error.message,
		});
	}
}

async function listExternalTeams(req, res) {
	try {
		const rawCountry = req.query.country;
		const country =
			typeof rawCountry === 'string' && rawCountry.trim() !== '' && rawCountry.toLowerCase() !== 'all'
				? rawCountry
				: undefined;
		const sport = req.query.sport || 'Soccer';
		const teams = await getExternalTeams({ country, sport });

		return res.json({
			total: teams.length,
			data: teams,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Error al consumir TheSportsDB',
			error: error.message,
		});
	}
}

async function listCountries(req, res) {
	try {
		const localTeams = await getProcessedTeams();
		const localCountries = localTeams
			.map((team) => team.country)
			.filter((country) => typeof country === 'string' && country.trim() !== '');

		const externalCountries = await getExternalCountries();

		const countries = Array.from(new Set([...localCountries, ...externalCountries])).sort((a, b) =>
			a.localeCompare(b)
		);

		return res.json({
			total: countries.length,
			data: countries,
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Error al obtener listado de paises',
			error: error.message,
		});
	}
}

module.exports = {
	listTeams,
	getTeam,
	listExternalTeams,
	listCountries,
};
