const { getProcessedTeams } = require('../services/teamsService');

async function listTeams(req, res) {
	try {
		const teams = await getProcessedTeams(req.query);

		res.json({
			total: teams.length,
			data: teams,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error processing teams data',
			error: error.message,
		});
	}
}

module.exports = {
	listTeams,
};
