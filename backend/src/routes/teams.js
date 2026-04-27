const express = require('express');

const {
	listTeams,
	getTeam,
	listExternalTeams,
	listCountries,
} = require('../controllers/teamsController');

const router = express.Router();

router.get('/', listTeams);
router.get('/external', listExternalTeams);
router.get('/countries', listCountries);
router.get('/:id', getTeam);

module.exports = router;
