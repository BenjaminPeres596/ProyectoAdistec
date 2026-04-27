const express = require('express');
const cors = require('cors');

const teamsRouter = require('./routes/teams');
const statsRouter = require('./routes/stats');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/teams', teamsRouter);
app.use('/api/stats', statsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Football API running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
