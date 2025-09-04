import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );

    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const fileBuffer = imageFile.buffer;

    // upload image to imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/BlogVerse",
    });

    // Optimize image through imagekit url transformation
    const transformedUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    const image = transformedUrl;

    const blog = await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    return res
      .status(200)
      .json({ success: true, message: "Blog added successfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.body.id;
    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePublishBlog = async (req, res) => {
  try {
    console.log(req.body);
    const { blogId } = req.body;
    const blog = await Blog.findById({ _id: blogId });

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res
      .status(200)
      .json({ success: true, message: "Blog status updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    const Comment = await Comment.create({ blog, name, content,});
    return res.status(200).json({ success: true, message: "Comment added successfully for review", Comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const Comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, Comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};