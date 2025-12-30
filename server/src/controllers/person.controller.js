import Person from "../models/Person.js";
import path from "path";

/**
 * Add new voice profile
 * POST /api/person/add
 */
// import Person from "../models/Person.js";

import cloudinary from "../config/cloudinary.js";
// import Person from "../models/Person.js";

export const addPerson = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Voice file required" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: `voices/samples/${req.userId}`,
      resource_type: "video"
    });

    const person = await Person.create({
      name,
      voicePath: upload.secure_url, // ✅ CLOUDINARY URL
      userId: req.userId
    });

    res.status(200).json(person);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add voice" });
  }
};



/**
 * Get all voice profiles of logged-in user
 * GET /api/person
 */
export const getPersons = async (req, res) => {
  try {
    const persons = await Person.find({ userId: req.userId });
    res.status(200).json(persons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch voices" });
  }
};
