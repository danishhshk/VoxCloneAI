// // import Person from "../models/Person.js";
// // import User from "../models/User.js";

// // export const addPerson = async (req, res) => {
// //   const person = await Person.create({
// //     name: req.body.name,
// //     voicePath: req.file.path,
// //     userId: req.userId
// //   });

// //   await User.findByIdAndUpdate(req.userId, {
// //     $inc: { "usage.clonesCount": 1 }
// //   });

// //   res.json(person);
// // };

// import express from "express";
// import auth from "../middleware/auth.middleware.js";
// import {
//   addPerson,
//   getPersons
// } from "../controllers/person.controller.js";

// const router = express.Router();

// router.post("/add", auth, addPerson);
// router.get("/", auth, getPersons); // 👈 THIS WAS MISSING

// export default router;


import Person from "../models/Person.js";
import path from "path";

/**
 * Add new voice profile
 * POST /api/person/add
 */
// import Person from "../models/Person.js";

import cloudinary from "../config/cloudinary.js";
import Person from "../models/Person.js";

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
