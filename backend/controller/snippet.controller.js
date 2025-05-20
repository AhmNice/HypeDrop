import { Notification } from "../models/notification.model.js";
import { Snippet } from "../models/snippet.model.js";
import { User } from "../models/user.model.js";
import { deleteFile } from "../utils/deleteFile.js";
import { handleFileAndCoverUpload } from "../utils/fileUploader.js";
import path from 'path';
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadPath = path.join(__dirname, '..', 'uploads');

const audioFolder = path.join(uploadPath, 'audio');
const coverPhotoFolder = path.join(uploadPath, 'coverPhotos');

export const createSnippet = async (req, res) => {
  try {
    // Handle file uploads
    const files = await handleFileAndCoverUpload(req, res);

    // Extract file paths
    const audioFile = files.audio ? files.audio[0] : null;
    const coverPhotoFile = files.coverPhoto ? files.coverPhoto[0] : null;

    if (!audioFile || !audioFile.path) {
      return res.status(400).json({ message: "Audio file upload failed" });
    }

    if (!coverPhotoFile || !coverPhotoFile.path) {
      return res.status(400).json({ message: "Cover photo upload failed" });
    }

    // Extract relative paths (starting from 'uploads/')
    const audioPath = path.relative('backend', audioFile.path); // e.g., 'uploads/audio/example.mp3'
    const coverPhotoPath = path.relative('backend', coverPhotoFile.path); // e.g., 'uploads/coverPhotos/example.jpg'

    // Extract other fields from the request body
    const { title, artistName, releaseDate } = req.body;
    if (!title || !artistName || !releaseDate) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Create a new snippet
    const newSnippet = new Snippet({
      title,
      artistName,
      releaseDate,
      audioPath, // Save relative path
      coverPhotoPath, // Save relative path
      owner: req.userId,
    });


    await Promise.all([
      newSnippet.save(),
      new Notification({
        user:req.userId,
        title:'Snippet upload',
        message:'Your snippet has been uploaded successfully',
        link:'/snippets',
        type:'snippet'
      }).save()
    ]);

    return res.status(201).json({
      message: "Snippet created successfully",
      snippet: newSnippet,
    });
  } catch (err) {
    console.error("Error creating snippet:", err.message);
    return res.status(500).json({ message: "Error creating snippet", error: err.message });
  }
};

export const getAllSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find();
    return res.status(200).json({ results: snippets });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching snippets", error: err.message });
  }
};

export const getSnippet = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Snippet id is required" });

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    return res.status(200).json({ success: true, results: snippet });
  } catch (err) {
    console.error("Error fetching snippet:", err.message);
    return res.status(500).json({ message: "Error fetching snippet", error: err.message });
  }
};

export const updateSnippet = async (req, res) => {
  // const { formData } = req.body;
  // if (!formData) return res.status(400).json({ message: "Snippet formData is required" });

  const { id, title, artistName, releaseDate, audioPath, coverPhotoPath, released } = req.body;
  if (!id) return res.status(400).json({ message: "Snippet id is required" });

  if (!title && !artistName && !releaseDate && released === undefined) {
    return res.status(400).json({ message: "At least one field is required to update" });
  }

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });

    if (title) snippet.title = title;
    if (artistName) snippet.artistName = artistName;
    if (releaseDate) snippet.releaseDate = releaseDate;
    if (released !== undefined) snippet.released = released;
    // if (audioPath) snippet.audioPath = audioPath;
    // if (coverPhotoPath) snippet.coverPhotoPath = coverPhotoPath;

    await snippet.save();

    return res.status(200).json({ message: "Snippet updated successfully", snippet });
  } catch (error) {
    console.error("Error updating snippet:", error.message);
    return res.status(500).json({ message: "Error updating snippet", error: error.message });
  }
};

export const deleteSnippet = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Snippet id is required" });

  try {
    const snippet = await Snippet.findByIdAndDelete(id);
    if (!snippet) return res.status(404).json({ message: "Snippet not found" });
    const snippetName = path.relative('audio', snippet.audioPath)
    const snippetCoverPhoto = path.relative('coverPhotos', snippet.coverPhotoPath)
    await deleteFile(audioFolder, snippetName)
    await deleteFile(coverPhotoFolder, snippetCoverPhoto)
    await new Notification({
      user:req.userId,
      title:'Deleted snippet',
      message:`Your snippet ${snippet.title} has been deleted !`,
      type:'delete'
    }).save()
    return res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error deleting snippet:", error.message);
    return res.status(500).json({ message: "Error deleting snippet", error: error.message });
  }
};

export const getSnippetByArtistOrTitle = async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: "Query is required" });

  try {
    const snippets = await Snippet.find({
      $or: [{ artistName: query }, { title: query }],
    });

    if (!snippets || snippets.length === 0) {
      return res.status(200).json({ message: "No snippets found for this query" });
    }

    return res.status(200).json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error.message);
    return res.status(500).json({ message: "Error fetching snippets", error: error.message });
  }
};

export const disableSnippet = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, message: "Snippet id is required" });

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) return res.status(404).json({ success: false, message: "Snippet not found" });

    snippet.isDisabled = true;
    await snippet.save();

    return res.status(200).json({ success: true, message: "Snippet disabled successfully", snippet });
  } catch (error) {
    console.error("Error disabling snippet:", error.message);
    return res.status(500).json({ message: "Error disabling snippet", error: error.message });
  }
};

export const enableSnippet = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ success: false, message: "Snippet id is required" });

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) return res.status(404).json({ success: false, message: "Snippet not found" });

    snippet.isDisabled = false;
    await snippet.save();

    return res.status(200).json({ success: true, message: "Snippet enabled successfully", snippet });
  } catch (error) {
    console.error("Error enabling snippet:", error.message);
    return res.status(500).json({ message: "Error enabling snippet", error: error.message });
  }
};
export const getArtistSnippet = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Artist ID not provided',
    });
  }

  try {
    const snippets = await Snippet.find({ owner: id }) .sort({ createdAt: -1 });

    if (!snippets || snippets.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No snippets by this artist',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Snippets found',
      results: snippets,
    });
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({
      success: false,
      message: 'Could not fetch snippets',
    });
  }
};
export const updateSnippetLinks = async (req, res) => {
  const { id, links } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Snippet ID is required' });
  }

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ success: false, message: 'Snippet not found' });
    }

    const { platform, link } = links;

    if (!platform || !link) {
      return res.status(400).json({ success: false, message: 'Platform and link are required' });
    }
    snippet.links[platform] = link;
    snippet.markModified('links');
    await snippet.save();

    return res.status(201).json({ success: true, message: `Link for ${platform} updated successfully` });

  } catch (error) {
    console.error('Error updating links:', error.message);
    return res.status(500).json({ success: false, message: 'Could not update links' });
  }
};


