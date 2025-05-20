import { Snippet } from "../models/snippet.model.js";
import { TrendingSnippets } from '../models/trendingSnippets.model.js';

export const trending = async (req, res) => {
  const  userId  = req.userId;
  // console.log(req.userId)
  if (!userId)
    return res.status(400).json({ success: false, message: 'userId is required' });

  try {
    const snippets = await Snippet.find({
      owner: userId,
      totalPlays: { $gte: 250 },
    });

    if (!snippets || snippets.length === 0) {
      return res.status(200).json({ success: false, message: 'You have no trending snippets' });
    }

    // Sort snippets by totalPlays descending
    snippets.sort((a, b) => b.totalPlays - a.totalPlays);

    const results = [];

    for (let i = 0; i < snippets.length; i++) {
      const snippet = snippets[i];
      const newPosition = i + 1;

      let existing = await TrendingSnippets.findOne({ snippetId: snippet._id });

      if (!existing) {
        const newRecord = new TrendingSnippets({
          snippetId: snippet._id,
          title:snippet.title,
          owner: snippet.owner,
          position: newPosition,
          audioPath: snippet.audioPath,
          coverPhotoPath: snippet.coverPhotoPath,
          prevPosition: newPosition,
          totalPlays: snippet.totalPlays,
          trend: 'new',
          totalPlays:snippet.totalPlays
        });
        await newRecord.save();
        results.push(newRecord);
      } else {
        const prevPosition = existing.position || newPosition;
        const positionChange =
          prevPosition > newPosition ? 'up' :
          newPosition > prevPosition ? 'down' :
          'same';

        existing.prevPosition = prevPosition;
        existing.position = newPosition;
        existing.totalPlays = snippet.totalPlays;
        existing.trend = positionChange;
        existing.title=snippet.title,
        existing.totalPlays = snippet.totalPlays
        existing.audioPath=snippet.audioPath,
        existing.coverPhotoPath=snippet.coverPhotoPath,

        await existing.save();
        results.push(existing);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Here are all your trending snippets',
      results,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Could not fetch trending snippets',
    });
  }
};
