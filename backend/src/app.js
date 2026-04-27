const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const teamsRouter = require('./routes/teams');
const statsRouter = require('./routes/stats');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/api/teams', teamsRouter);
app.use('/api/stats', statsRouter);

// Endpoints base
app.get('/', (req, res) => {
	res.json({ message: 'API de futbol en ejecucion' });
});

app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' });
});

// Arranque del servidor
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`Servidor corriendo en http://localhost:${PORT}`);
	});
}

module.exports = app;
