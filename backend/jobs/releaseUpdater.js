import cron from 'node-cron';
import { Snippet } from '../models/snippet.model.js';

// Runs every day at midnight
export const releaseUpdater = ()=>{
  cron.schedule('0 0 * * *', async () => {
    try {
      const result = await Snippet.updateMany(
        { released: false, releaseDate: { $lt: new Date() } },
        { $set: { released: true } }
      );
      console.log(`${result.modifiedCount} songs marked as released.`);
    } catch (err) {
      console.error('Error updating released songs:', err);
    }
  });
}