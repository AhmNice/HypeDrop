import cron from 'node-cron';
import { Snippet } from '../models/snippet.model.js';
import { User } from '../models/user.model.js';
import { sendReleasedSongEmail } from '../mailer/nodemailer/emails.js';
import { Notification } from '../models/notification.model.js';

export const releaseUpdater = () => {
  cron.schedule('0 0 * * *', async () => {
    try {
      // Find unreleased snippets whose releaseDate has passed
      const snippetsToRelease = await Snippet.find({
        released: false,
        releaseDate: { $lte: new Date() }
      });

      for (const snippet of snippetsToRelease) {
        const owner = await User.findById(snippet.owner);
        if (owner) {
          const link = `${process.env.CLIENT_URL}/snippets`;
          try {
            await sendReleasedSongEmail(owner.email, owner.stageName, snippet.title, link);
          } catch (err) {
            console.error(`Failed to send email for snippet "${snippet.title}":`, err);
          }
        }

        // Mark snippet as released
        snippet.released = true;

        // Create and save notification
        const notification = new Notification({
          user: snippet.owner,
          type: 'song released',
          title: 'Song Released',
          message: `Your song "${snippet.title}" has been released!`,
        });


        try {
          await Promise.all([
            notification.save(),
            snippet.save()
          ]);
        } catch (err) {
          console.error(`Failed to save snippet or notification for "${snippet.title}":`, err);
        }
      }

      console.log(`${snippetsToRelease.length} songs marked as released and emails sent.`);
    } catch (err) {
      console.error('Error updating released songs:', err);
    }
  });
};
