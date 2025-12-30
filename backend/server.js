import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('smart task manager backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});