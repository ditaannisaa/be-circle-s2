import { v2 as cloudinary } from "cloudinary";

export default new (class Cloudinary {
  upload() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async destination(image: any) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        "src/uploads" + image
      );
      return cloudinaryResponse.secure_url;
    } catch (err) {
      throw err;
    }
  }
})();
