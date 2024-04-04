import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Data from './models';

const app = express();
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI, { dbName: "sample_supplies" })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));


// Middleware
app.use(cors());
app.use(express.json());

const getAllItems = async (req: Request, res: Response) => {
    try {
       const items = await Data.find();
       return res.json(items);
    } catch (error) {
       console.error('Error fetching items:', error);
       return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Routes
app.get('/api/items', getAllItems);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
