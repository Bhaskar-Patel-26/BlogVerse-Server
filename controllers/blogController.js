import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";

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
