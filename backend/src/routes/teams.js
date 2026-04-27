const express = require('express');

const { listTeams } = require('../controllers/teamsController');

const router = express.Router();

router.get('/', listTeams);

module.exports = router;
