import express from "express";
import { addBlog, getAllBlogs, getBlogById, deleteBlogById, togglePublishBlog, addComment, getBlogComments } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), auth, addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.post("/delete", auth, deleteBlogById);
blogRouter.post("/toggle-publish", auth, togglePublishBlog);

blogRouter.post("/add-comment", addComment);
blogRouter.get("/:id/comments", getBlogComments);

blogRouter.get("/:id", getBlogById);

export default blogRouter;