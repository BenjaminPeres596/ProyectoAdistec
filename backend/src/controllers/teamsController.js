const { getProcessedTeams, getTeamById } = require('../services/teamsService');
const { getExternalTeams } = require('../services/sportsDbService');

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
		const country = req.query.country || 'Argentina';
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

module.exports = {
	listTeams,
	getTeam,
	listExternalTeams,
};
