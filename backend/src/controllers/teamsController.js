const { getProcessedTeams, getTeamById } = require('../services/teamsService');

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

module.exports = {
	listTeams,
	getTeam,
};
