require('dotenv').config();

const express = require('express');
const cors = require('cors');
const teamsRouter = require('./routes/teams');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/api/teams', teamsRouter);

// Endpoints base
app.get('/', (req, res) => {
	res.json({ message: 'Football API running' });
});

app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' });
});

// Arranque del servidor
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
}

module.exports = app;
