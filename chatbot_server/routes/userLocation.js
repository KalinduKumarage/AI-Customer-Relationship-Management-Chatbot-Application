import userLocationSchema from "../models/userLocationModel.js";
import mongoose from "mongoose";
import express from "express";

let router = express.Router();

// CREATE User Location
router.route("/add-location").post((req, res, next) => {
  userLocationSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

export default router;
