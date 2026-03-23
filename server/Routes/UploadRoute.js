import express from "express";
import multer from "multer";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ================= MULTIPLE FILE UPLOAD =================
router.post("/", upload.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files received" });
    }

    const folderType = req.query.type || "posts";

    let folderPath = "loopin/posts";
    if (folderType === "events") folderPath = "loopin/events";
    if (folderType === "users") folderPath = "loopin/users";

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        resource_type: "auto",
        folder: folderPath,
      })
    );

    const results = await Promise.all(uploadPromises);

    // Delete temp files
    req.files.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.log("Delete error:", err);
      });
    });

    const uploadedFiles = results.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    res.status(200).json(uploadedFiles);
  } catch (error) {
    console.log("UPLOAD ERROR:", error);

    // Cleanup even if error happens
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(file.path, () => {});
      });
    }

    res.status(500).json({ message: error.message });
  }
});

// ================= USER PROFILE UPLOAD =================
router.post(
  "/users",
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "coverPicture", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const uploadedFiles = {};

      // ===== Profile Picture =====
      if (req.files?.profilePicture) {
        const file = req.files.profilePicture[0];

        const profileUpload = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          folder: "loopin/users/profile",
        });

        // Delete temp file
        fs.unlink(file.path, (err) => {
          if (err) console.log("Delete error:", err);
        });

        uploadedFiles.profilePicture = {
          url: profileUpload.secure_url,
          public_id: profileUpload.public_id,
        };
      }

      // ===== Cover Picture =====
      if (req.files?.coverPicture) {
        const file = req.files.coverPicture[0];

        const coverUpload = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          folder: "loopin/users/cover",
        });

        // Delete temp file
        fs.unlink(file.path, (err) => {
          if (err) console.log("Delete error:", err);
        });

        uploadedFiles.coverPicture = {
          url: coverUpload.secure_url,
          public_id: coverUpload.public_id,
        };
      }

      res.status(200).json(uploadedFiles);
    } catch (error) {
      console.log("USER UPLOAD ERROR:", error);

      // Cleanup on error
      if (req.files) {
        Object.values(req.files).flat().forEach((file) => {
          fs.unlink(file.path, () => {});
        });
      }

      res.status(500).json({ message: error.message });
    }
  }
);

export default router;