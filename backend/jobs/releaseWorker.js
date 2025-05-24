import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../db/connectDB.js';
import { releaseUpdater } from './releaseUpdater.js';

const start = async () => {
  await connectDB();
  releaseUpdater();
  // Keep the process alive
};

start();