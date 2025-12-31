import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());//Without this, req.body is undefined

app.get('/', (req, res) => {
  res.send('smart task manager backend is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});