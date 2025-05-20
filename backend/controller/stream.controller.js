import {Streams} from '../models/streams.model.js'
import { TrendingSnippets } from '../models/trendingSnippets.model.js'
import { Snippet } from '../models/snippet.model.js';
export const updateStreams = async (req, res) => {
  const { songId, userId, ownerId, guestId } = req.body;

  if (!songId || !ownerId || (!userId && !guestId)) {
    return res.status(400).json({ success: false, message: 'Required fields are empty' });
  }

  try {
    const query = userId
      ? { songId, userId }
      : { songId, guestId };

    const existingStream = await Streams.findOne(query);

    const now = Date.now();
    const THIRTY_MINUTES = 30 * 60 * 1000;
    let shouldCount = false;

    if (existingStream) {
      const timeSinceLastStream = now - new Date(existingStream.streamLastAt).getTime();

      if (timeSinceLastStream >= THIRTY_MINUTES) {
        existingStream.streamLastAt = now;
        await existingStream.save();
        shouldCount = true;
      } else {
        return res.status(200).json({ counted: false, message: 'Streamed too soon' });
      }
    } else {
      if (userId) {
        await Streams.create({ songId, userId, streamLastAt: now });
      } else {
        await Streams.create({ songId, guestId, streamLastAt: now });
      }
      shouldCount = true;
    }

    if (shouldCount) {
      const song = await Snippet.findById(songId);
      if (!song) {
        return res.status(404).json({ success: false, message: 'Snippet not found' });
      }

      const identifier = userId || guestId;

      if (song.owner.toString() === identifier) {
        return res.status(200).json({ counted: false, message: 'Artist stream not counted' });
      }

      song.totalPlays = parseInt(song.totalPlays || '0', 10) + 1;


      await song.save();

      return res.status(200).json({ counted: true, success: true, message: 'Stream counted' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
