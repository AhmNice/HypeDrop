import { Snippet } from "../models/snippet.model.js";
import { TrendingSnippets } from '../models/trendingSnippets.model.js';

export const trending = async (req, res) => {
  try {
    // Fetch all snippets (or filter later)
    const allSnippets = await Snippet.find();

    // Filter snippets where totalPlays (as number) >= 250, then sort descending by totalPlays
    const trendingSnippets = allSnippets
      .filter(snippet => Number(snippet.totalPlays) >= 250)
      .sort((a, b) => Number(b.totalPlays) - Number(a.totalPlays))
      .slice(0, 10);

    if (!trendingSnippets || trendingSnippets.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No trending snippets found",
        results: [],
      });
    }

    const results = [];

    for (let i = 0; i < trendingSnippets.length; i++) {
      const snippet = trendingSnippets[i];
      const newPosition = i + 1;

      let existing = await TrendingSnippets.findOne({ snippetId: snippet._id });

      if (!existing) {
        const newTrend = new TrendingSnippets({
          snippetId: snippet._id,
          title: snippet.title,
          owner: snippet.owner,
          position: newPosition,
          prevPosition: newPosition,
          audioPath: snippet.audioPath,
          coverPhotoPath: snippet.coverPhotoPath,
          totalPlays: Number(snippet.totalPlays), // convert to number here
          trend: 'new',
        });

        await newTrend.save();
        results.push(newTrend);
      } else {
        const prevPosition = existing.position || newPosition;

        const positionChange =
          prevPosition > newPosition ? 'up' :
          newPosition > prevPosition ? 'down' :
          'same';

        existing.prevPosition = prevPosition;
        existing.position = newPosition;
        existing.trend = positionChange;

        existing.title = snippet.title;
        existing.owner = snippet.owner;
        existing.audioPath = snippet.audioPath;
        existing.coverPhotoPath = snippet.coverPhotoPath;
        existing.totalPlays = Number(snippet.totalPlays); // convert here

        await existing.save();
        results.push(existing);
      }
    }

    // Convert totalPlays to number before sending response
    const responseResults = results.map(trend => ({
      ...trend.toObject(),
      totalPlays: Number(trend.totalPlays),
      position: Number(trend.position),
      prevPosition: Number(trend.prevPosition),
    }));

    return res.status(200).json({
      success: true,
      message: 'Here are the trending snippets with movement tracking',
      results: responseResults,
    });

  } catch (error) {
    console.error("Trending error:", error);
    return res.status(500).json({
      success: false,
      message: 'Could not fetch trending snippets',
    });
  }
};
