import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const adminLogin = (req, res) => {
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});   
    }
}

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCommentsAdmin = async (req, res) => {
  try {
    const Comments = await Comment.find({}).populate("blog").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, Comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try{
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments({});
    const recentComments = await Comment.find({}).sort({ createdAt: -1 }).limit(5);
    const comments = await Comment.countDocuments({});
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = { recentBlogs, blogs, recentComments, comments, drafts };
    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    const comment = await Comment.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Comment deleted successfully", comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const {id} = req.body;
    const comment = await Comment.findByIdAndUpdate(id, {isApproved: true});

    return res
      .status(200)
      .json({ success: true, message: "Comment approved successfully", comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};