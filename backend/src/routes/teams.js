const express = require('express');

const { listTeams, getTeam } = require('../controllers/teamsController');

const router = express.Router();

router.get('/', listTeams);
router.get('/:id', getTeam);

module.exports = router;
