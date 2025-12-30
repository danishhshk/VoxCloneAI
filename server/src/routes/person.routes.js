// import express from "express";
// import auth from "../middleware/auth.middleware.js";
// import upload from "../config/multer.js";
// import { addPerson } from "../controllers/person.controller.js";

// const router = express.Router();

// router.post("/add", auth, upload.single("voice"), addPerson);

// export default router;
import express from "express";
import auth from "../middleware/auth.middleware.js";
import uploadVoice from "../middleware/uploadVoice.js";
import { addPerson, getPersons } from "../controllers/person.controller.js";

const router = express.Router();

router.post("/add", auth, uploadVoice.single("voice"), addPerson);
router.get("/", auth, getPersons);

export default router;
