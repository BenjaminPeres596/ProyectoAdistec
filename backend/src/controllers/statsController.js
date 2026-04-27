const { getTeamsStats } = require('../services/teamsService');

async function getStats(req, res) {
	try {
		const stats = await getTeamsStats();
		res.json({ data: stats });
	} catch (error) {
		res.status(500).json({
			message: 'Error al obtener estadisticas',
			error: error.message,
		});
	}
}

module.exports = {
	getStats,
};
