
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your real Supabase project credentials
const supabaseUrl = 'https://supabase.com/dashboard/project/rocrsoqkimwqygqjlwmd
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvY3Jzb3FraW13cXlncWpsd21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDYwNDIsImV4cCI6MjA2MDI4MjA0Mn0.ctr8qsMsTap9bX-yrvzMYx1ClBYhq-8G74hHidXoP-A';
const supabase = createClient(supabaseUrl, supabaseKey);

// Root test route
app.get('/', (req, res) => {
  res.send('Shift Backend API with Supabase is live!');
});

// POST /api/shifts — save to Supabase
app.post('/api/shifts', async (req, res) => {
  const { role, hospital } = req.body;

  if (!role || !hospital) {
    return res.status(400).json({ error: 'Missing role or hospital' });
  }

  const { data, error } = await supabase
    .from('shifts')
    .insert([{ role, hospital }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({
    success: true,
    message: 'Shift saved to database!',
    data,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
