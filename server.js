const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('Shift Backend API is working!');
});

// Real /api/shifts POST route
app.post('/api/shifts', (req, res) => {
  const { role, hospital } = req.body;

  if (!role || !hospital) {
    return res.status(400).json({ error: 'Missing role or hospital' });
  }

  // Dummy response to simulate saving shift
  return res.json({
    success: true,
    message: 'Shift created successfully',
    data: { role, hospital }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
