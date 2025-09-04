import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentById,
  getAllBlogsAdmin,
  getAllCommentsAdmin,
  getDashboard,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/blogs", getAllBlogsAdmin);
adminRouter.get("/comments", getAllCommentsAdmin);
adminRouter.get("/dashboard", getDashboard);
adminRouter.post("/delete-comment", deleteCommentById);
adminRouter.post("/approve-comment", approveCommentById);

export default adminRouter;

