// filepath: backend/jobs/markReleased.js
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../db/connectDB.js';
import { Snippet } from '../models/snippet.model.js';

const run = async () => {
  await connectDB();
  const result = await Snippet.updateMany(
    { released: false, releaseDate: { $lt: new Date() } },
    { $set: { released: true } }
  );
  console.log(`${result.modifiedCount} songs marked as released.`);
  process.exit(0);
};

run().catch(err => {
  console.error('Error updating released songs:', err);
  process.exit(1);
});